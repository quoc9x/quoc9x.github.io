$(document).ready(function () {
    //loadData();
    var employeeJS = new EmployeeJS();
    //employeeJS.loadData();
})




class EmployeeJS {
    constructor() {
        // Gán mặc định FormMode:
        this.FormMode = null;
        // Load dữ liệu
        this.loadData();
        // Gán sự kiện
        this.initEvents();
    }

    initEvents() {
        $('#btnAdd').click(this.btnAddOnClick.bind(this));
        $('#btnInfoMat').click(this.btnInFoMatOnClick.bind(this));
        $('#btnSave').click(this.btnSaveOnClick.bind(this));
        $('#btnOkM').click(this.btnOkMOnClick.bind(this));

        $('#btnOkR').click(this.btnOkROnClick.bind(this));

        $('#btnEdit').click(this.btnEditOnClick.bind(this));
        $('#btnCancel').click(this.btnCancelOnClick.bind(this));
        $('.title-close-bottom').click(this.btnCancelOnClick.bind(this));
        $('.title-close-bottomM').click(this.btnCancelOnClickM.bind(this));
        $('.title-close-bottomR').click(this.btnCancelOnClickR.bind(this));

        $('#cboBeTongM').change(this.cboBeTongMOnChange.bind(this));
        $('#cboThepM').change(this.cboThepMOnChange.bind(this));

        $('#cboSoThanh').change(this.cboSoThanhOnChange.bind(this));
        $('#cboDuongKinh').change(this.cboDuongKinhOnChange.bind(this));

        $('#btnKiemTraCotDai').click(this.btnKiemTraCotDaiOnClick.bind(this));


        $('#btnBeamProcess').click(this.btnBeamProcessOnClick.bind(this));

        $('#btnImportExcel').on('click', function() {
            $('#file-input').trigger('click');
        });

        //$("#txtEmployeeCode").blur(this.checkRequired);
        //$("#txtEmployeeName").blur(this.checkRequired);
        // Cách 1: Dùng class
        //$(".required").blur(this.checkRequired);
        // Cách 2: Dùng attribute
        $('#btnDelete').click(this.btnDeleteOnClick.bind(this));
        $("input[required]").blur(this.checkRequired);
        $("table tbody").on("click", "tr", this.rowOnSelect);

        $("table tbody").dblclick(this.trowOnDoubleClick.bind(this));
    }


    loadData() {

        $('.gridbar tbody').empty();
        $.each(lstBeams, function (index, items) {
            var trHTML = $(`<tr>
            <td>`+ items.beamID + `</td>
            <td>`+ items.Ten + `</td>
            <td>`+ items.BeTong + `</td>
            <td>`+ items.Thep + `</td>
            <td>`+ items.ChieuCaoh + `</td>
            <td>`+ items.BeRongb + `</td>
            <td>`+ items.BeDaySanhf + `</td>
            <td>`+ items.NhipDamL + `</td>
            <td>`+ items.NhipGiuaHaiDaml + `</td>
            <td>`+ items.KhoangCacha + `</td>
            <td>`+ items.MuyMin + `</td>
            <td>`+ items.MomentM + `</td>
            <td>`+ items.Q + `</td>
            <td>`+ items.KetQua + `</td>
                </tr>`);
            $('.gridbar tbody').append(trHTML);
        })

        $('#txtRb').val(750);
        $('#txtRbt').val(66);
        $('#txtEb').val(2100000);

        $('#txtRs').val(22500);
        $('#txtRsc').val(22500);
        $('#txtEs').val(21000000);

        $('#txtalphaR').val(0.449);
        $('#txtxiR').val(0.68);

        $('#txtmuyMin').val(0.003);
        $('#txtmuyMax').val(2.267);

    }

    rowOnSelect() {
        $(this).siblings().removeClass("row-selected");
        $(this).addClass("row-selected");
    }

    btnAddOnClick() {
        this.FormMode = "add";
        //alert('add');
        //$('.dialog-modal').show();
        //$('.dialog').show();
        this.showDialogDetail();

        // Đưa dữ liệu mẫu lên form
        var countBeam = 0;
        countBeam = lstBeams.length + 1;
        $("#txtTenDam").val("D" + countBeam);
        $("#txtChieuCaoh").val(0.6);
        $("#txtBeRongb").val(0.2);
        $("#txtBeDaySanhf").val(0.1);
        $("#txtNhipDamL").val(6);
        $("#txtKCGiua2NhipDam").val(3);
        $("#txtKhoangCacha").val(0.03);

        $("#cboBeTong").val(6).change();
        $("#cboThep").val(3).change();

        $("#txtMomentM").val(18);
        $("#txtLucCatQ").val(100);
        $("#txtMuyMin").val(0.05);
        /////////////////////////////////////////////////////////////
    }


    btnInFoMatOnClick() {

        this.showDialogDetailM();

    }

    btnEditOnClick() {
        var self = this;
        this.FormMode = "edit";
        // Lấy mã nhân viên được chọn:
        var beamID = this.getBeamIDSelected();
        if (beamID != null) {
            beamID--;
            // Hiển thị form chi tiết:
            this.showDialogDetail();
            // Binding các thông tin của nhân viên lên form
            var beam = lstBeams[beamID];
            $("#txtTenDam").val(beam.Ten);
            $("#txtChieuCaoh").val(beam.ChieuCaoh);
            $("#txtBeRongb").val(beam.BeRongb);
            $("#txtBeDaySanhf").val(beam.BeDaySanhf);
            $("#txtNhipDamL").val(beam.NhipDamL);
            $("#txtKCGiua2NhipDam").val(beam.NhipGiuaHaiDaml);
            $("#txtKhoangCacha").val(beam.KhoangCacha);

            $("#cboBeTong").val(beam.indexBeTong).change(); 
            $("#cboThep").val(beam.indexThep).change();

            $("#txtMomentM").val(beam.MomentM);
            $("#txtLucCatQ").val(beam.Q);

            $("#txtMuyMin").val(beam.MuyMin);

        }
        else {
            alert("Chưa chọn dầm để sửa");
        }

    }




    /**
     * Thực hiện cất dữ liệu:
     * */
    btnSaveOnClick() {
        // Kiểm tra dữ liệu trước khi lưu
        var inputRequireds = $("[required]");
        var isValid = true;
        $.each(inputRequireds, function (index, input) {
            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass("required-error")) {
                isValid = false;
            }
        })
        // Thực hiện cất dữ liệu vào database:
        // Kiểm tra xem sửa hay thêm mới
        if (isValid) {
            if (this.FormMode === "add") {
                var beam = {};
                beam.beamID = lstBeams.length + 1;

                beam.Ten = $("#txtTenDam").val();
                beam.ChieuCaoh = $("#txtChieuCaoh").val();
                beam.BeRongb = $("#txtBeRongb").val();
                beam.BeDaySanhf = $("#txtBeDaySanhf").val();
                beam.NhipDamL = $("#txtNhipDamL").val();
                beam.NhipGiuaHaiDaml = $("#txtKCGiua2NhipDam").val();
                beam.KhoangCacha = $("#txtKhoangCacha").val();

                beam.BeTong = $("#cboBeTong option:selected").text();
                beam.Thep = $("#cboThep option:selected").text();
                beam.indexBeTong = $("#cboBeTong option:selected").val();
                beam.indexThep = $("#cboThep option:selected").val();

                beam.MomentM = $("#txtMomentM").val();
                beam.Q = $("#txtLucCatQ").val();
                beam.MuyMin = $("#txtMuyMin").val();

                beam.KetQua = "Chưa tính toán";

                lstBeams.push(beam);
            }
            else if (this.FormMode === "edit") {
                var beamID = this.getBeamIDSelected();
                beamID--;
                lstBeams[beamID].Ten = $("#txtTenDam").val();
                lstBeams[beamID].ChieuCaoh = $("#txtChieuCaoh").val();
                lstBeams[beamID].BeRongb = $("#txtBeRongb").val();
                lstBeams[beamID].BeDaySanhf = $("#txtBeDaySanhf").val();
                lstBeams[beamID].NhipDamL = $("#txtNhipDamL").val();
                lstBeams[beamID].NhipGiuaHaiDaml = $("#txtKCGiua2NhipDam").val();
                lstBeams[beamID].KhoangCacha = $("#txtKhoangCacha").val();

                lstBeams[beamID].BeTong = $("#cboBeTong option:selected").text();
                lstBeams[beamID].Thep = $("#cboThep option:selected").text();
                lstBeams[beamID].indexBeTong = $("#cboBeTong option:selected").val();
                lstBeams[beamID].indexThep = $("#cboThep option:selected").val();

                lstBeams[beamID].MomentM = $("#txtMomentM").val();
                lstBeams[beamID].Q = $("#txtLucCatQ").val();
                lstBeams[beamID].MuyMin = $("#txtMuyMin").val();
            }
            // Load lại dữ liệu:
            this.loadData();
            this.hideDialogDetail();
        }

    }

    btnOkMOnClick() {
        this.hideDialogDetailM();
    }

    btnOkROnClick() {
        this.hideDialogDetailR();
    }

    btnDeleteOnClick() {
        var self = this;
        // Lấy mã nhân viên được chọn:
        var beamID = this.getBeamIDSelected();
        lstBeams.splice(beamID - 1, 1);
        if (beamID) {
            var i;
            for (i = 0; i < lstBeams.length; i++) {
                lstBeams[i].beamID = i + 1;
            }
            this.loadData();
        } else {
            alert('Chưa có dầm nào được chọn');
        }

    }

    /**
     * Lấy mã dầm được chọn trong danh sách
     * */
    getBeamIDSelected() {
        // 1. Xác định nhân viên nào được chọn:
        var beamID = null;
        var trSelected = $("#tbBeamList tr.row-selected");
        if (trSelected.length > 0) {
            beamID = $(trSelected).children()[0].textContent;
        }
        return beamID;
    }

    /**
     * Lấy trạng thái dầm được chọn trong danh sách
     * */
    getBeamStatusSelected() {
        // 1. Xác định nhân viên nào được chọn:
        var beamStatus = null;
        var trSelected = $("#tbBeamList tr.row-selected");
        if (trSelected.length > 0) {
            beamStatus = $(trSelected).children()[13].textContent;
        }
        return beamStatus;
    }


    getID() {
        var id = $("#tbBeamList tr.row-selected[beamID]");
        return id.attr("employeeID");
    }


    checkRequired() {
        //debugger;
        var value = this.value;
        if (!value) {
            $(this).addClass('required-error');
            $(this).attr("title", "Bạn phải nhập thông tin này.");
            return;
        }
        else {
            $(this).removeClass('required-error');
            $(this).removeAttr("title");
        }
        //$("#txtEmployeeCode").addClass('required-error');
        ////$("#txtEmployeeCode").focus();
        //$("#txtEmployeeCode").attr("title", "Bạn phải nhập thông tin này.");
    }


    btnCancelOnClick() {
        //alert('add');
        //$('.dialog-modal').hide();
        //$('.dialog').hide();

        this.hideDialogDetail();
    }

    btnCancelOnClickM() {
        //alert('add');
        //$('.dialog-modal').hide();
        //$('.dialog').hide();

        this.hideDialogDetailM();
    }

    btnCancelOnClickR() {
        this.hideDialogDetailR();
    }
    /*
     * Hiển thị dialog chi tiết 
     * Author: quocnvc
     * */
    showDialogDetail() {
        // Clean tất cả các giá trị cũ trên các input trong form:
        $('.dialog input').val(null);
        $('.dialog-modal').show();
        $('.dialog').show();
        $("#txtTenDam").focus();
    }

    showDialogDetailM() {
        // Clean tất cả các giá trị cũ trên các input trong form:
        $('.dialog input').val(null);
        $('.dialog-modal').show();
        $('.dialog-material').show();
        // $("#txtTenDam").focus();
    }

    showDialogDetailR() {
        // Clean tất cả các giá trị cũ trên các input trong form:
        $('.dialog-result input').val(null);
        $('.dialog-modal').show();
        $('.dialog-result').show();
        $('#txtKCCotDai').removeClass("required-error");
        $('#txtKCCotDai').removeAttr("title");

        //$("#txtDienTich").prop('disabled', true);
        // $("#txtTenDam").focus();
    }

    /*
     * Ẩn dialog chi tiết 
     * Author: quocnvc
     * */
    hideDialogDetail() {
        $('.dialog-modal').hide();
        $('.dialog').hide();
    }

    hideDialogDetailM() {
        $('.dialog-modal').hide();
        $('.dialog-material').hide();
    }

    hideDialogDetailR() {
        $('.dialog-modal').hide();
        $('.dialog-result').hide();
    }

    cboBeTongMOnChange() {
        var typeBeTongOnChange = $("#cboBeTongM option:selected").text();
        var typeThepOnChange = $("#cboThepM option:selected").text();
        var beTongOnChange = this.infoBeTong(typeBeTongOnChange);

        var heSoOnChange = this.infoHeSo(typeBeTongOnChange, typeThepOnChange);

        $('#txtRb').val(beTongOnChange.Rb);
        $('#txtRbt').val(beTongOnChange.Rbt);
        $('#txtEb').val(beTongOnChange.Eb);

        $('#txtxiR').val(heSoOnChange.xiR);
        $('#txtalphaR').val(heSoOnChange.alphaR);
        $('#txtmuyMax').val(heSoOnChange.muyMax);

    }


    cboThepMOnChange() {
        var typeBeTongOnChange = $("#cboBeTongM option:selected").text();
        var typeThepOnChange = $("#cboThepM option:selected").text();

        var thepOnChange = this.infoThep(typeThepOnChange);

        var heSoOnChange = this.infoHeSo(typeBeTongOnChange, typeThepOnChange);

        $('#txtRs').val(thepOnChange.Rs);
        $('#txtRsc').val(thepOnChange.Rsc);
        $('#txtEs').val(thepOnChange.Es);

        $('#txtxiR').val(heSoOnChange.xiR);
        $('#txtalphaR').val(heSoOnChange.alphaR);
        $('#txtmuyMax').val(heSoOnChange.muyMax);
    }

    cboSoThanhOnChange() {
        this.KiemTraKetQuaThep();
    }

    cboDuongKinhOnChange() {
        this.KiemTraKetQuaThep();
    }

    trowOnDoubleClick() {
        var beamStatus = this.getBeamStatusSelected();
        var beamID = this.getBeamIDSelected();
        var isStatus = (beamStatus != "Chưa tính toán") && (beamStatus != null);
        if (isStatus){
            this.showDialogDetailR();
            $("#cboSoThanh").val(1).change();
            $("#cboDuongKinh").val(9).change();
            $("#cboSoNhanh").val(0).change();
            $("#cboDKCotDai").val(1).change();
            $("#txtKCCotDai").val(3);
            this.KiemTraKetQuaThep();
            this.btnKiemTraCotDaiOnClick();
        }
    }

    btnBeamProcessOnClick() {
        var beamID = this.getBeamIDSelected();
        if (beamID === null){
            for (const beam of lstBeams) {
                var beTongOnProcess = this.infoBeTong(beam.BeTong);
                var thepOnProcess = this.infoThep(beam.Thep);
                var heSoOnProcess = this.infoHeSo(beam.BeTong, beam.Thep);
                var As = 0;
                if (beam.MomentM < 0) {
                    As = TinhThepHCN(beam.ChieuCaoh, beam.KhoangCacha, beam.BeRongb, beTongOnProcess.Rb, beam.MomentM,
                        heSoOnProcess.alphaR, heSoOnProcess.xiR, thepOnProcess.Rs, beam.MuyMin, heSoOnProcess.muyMax);
                    As = As * 10000;
                    As = Math.round(As * 1000) / 1000;
                }
                else if (beam.MomentM > 0) {
                    var h0 = beam.ChieuCaoh - beam.KhoangCacha;
                    As = TinhThepHCT(beam.NhipGiuaHaiDaml * 1, heSoOnProcess.alphaR * 1, beam.BeRongb * 1, beam.ChieuCaoh * 1,
                        beam.MomentM * 1, beam.BeDaySanhf * 1, beTongOnProcess.Rb, h0,
                        heSoOnProcess.xiR, thepOnProcess.Rs,beam.MuyMin, heSoOnProcess.muyMax);
                    As = As * 10000;
                    As = Math.round(As * 1000) / 1000;
                }
    
                beam.As = As;
                beam.KetQua = "As = " + As + " (cm^2) - Double click xem chi tiết";
            }
        }
        else {
            var beam = lstBeams[beamID - 1];
            var beTongOnProcess = this.infoBeTong(beam.BeTong);
            var thepOnProcess = this.infoThep(beam.Thep);
            var heSoOnProcess = this.infoHeSo(beam.BeTong, beam.Thep);
            var As = 0;
            if (beam.MomentM < 0) {
                As = TinhThepHCN(beam.ChieuCaoh, beam.KhoangCacha, beam.BeRongb, beTongOnProcess.Rb, beam.MomentM,
                    heSoOnProcess.alphaR, heSoOnProcess.xiR, thepOnProcess.Rs, beam.MuyMin, heSoOnProcess.muyMax);
                As = As * 10000;
                As = Math.round(As * 1000) / 1000;
            }
            else if (beam.MomentM > 0) {
                var h0 = beam.ChieuCaoh - beam.KhoangCacha;
                As = TinhThepHCT(beam.NhipGiuaHaiDaml * 1, heSoOnProcess.alphaR * 1, beam.BeRongb * 1, beam.ChieuCaoh * 1,
                    beam.MomentM * 1, beam.BeDaySanhf * 1, beTongOnProcess.Rb, h0,
                    heSoOnProcess.xiR, thepOnProcess.Rs,beam.MuyMin, heSoOnProcess.muyMax);
                As = As * 10000;
                As = Math.round(As * 1000) / 1000;
            }

            beam.As = As;
            beam.KetQua = "As = " + As + " (cm^2) - Double click xem chi tiết";
        }
        
        this.loadData();
    }

    btnKiemTraCotDaiOnClick() {
        var kcCotDai = $("#txtKCCotDai").val();
        var soNhanhCotDai = $("#cboSoNhanh option:selected").text();
        var dkCotDai = $("#cboDKCotDai option:selected").text();
        var beamID = this.getBeamIDSelected();
        beamID--;
        var beTong = this.infoBeTong(lstBeams[beamID].BeTong);
        var thep = this.infoThep(lstBeams[beamID].Thep);
        var isValid = (kcCotDai != "") && (!isNaN(kcCotDai)) && (soNhanhCotDai != "") && (dkCotDai != "");
        if (isValid) {
            var res = KiemTraCotDai(lstBeams[beamID].KhoangCacha, lstBeams[beamID].Q, beTong.Rb, beTong.Rbt, thep.Rsc, 
                                   kcCotDai, thep.Es, beTong.Eb, lstBeams[beamID].BeRongb, lstBeams[beamID].ChieuCaoh, 
                                   dkCotDai, soNhanhCotDai);
            var obj = $('#spanDetailsCotDai').text(res);
            obj.html(obj.html().replace(/\n/g, '<br/>'));
        }
        else{
            $('#txtKCCotDai').addClass("required-error");
            if (kcCotDai === ""){
                $('#txtKCCotDai').attr("title", "Bạn phải nhập thông tin này.");
            }
            else{
                $('#txtKCCotDai').attr("title", "Thông tin này phải là số.");
            }
            
            var obj = $('#spanDetailsCotDai').text("Kiểm tra các giá trị \n đầu vào");
            obj.html(obj.html().replace(/\n/g, '<br/>'));
        }
    }    

    //#region Các hàm hỗ trợ
    infoBeTong(typeBeTong) {
        var beTong = {
            Rb: 750,
            Rbt: 66,
            Eb: 2100000
        }

        switch (typeBeTong) {
            case "B12.5 - M150": {
                beTong.Rb = 750;
                beTong.Rbt = 66;
                beTong.Eb = 2100000;
                break;
            }
            case "B15 - M200": {
                beTong.Rb = 850;
                beTong.Rbt = 75;
                beTong.Eb = 2300000;
                break;
            }
            case "B20 - M250": {
                beTong.Rb = 1150;
                beTong.Rbt = 90;
                beTong.Eb = 2700000;
                break;
            }
            case "B25 - M350": {
                beTong.Rb = 1450;
                beTong.Rbt = 105;
                beTong.Eb = 3000000;
                break;
            }
            case "B30 - M400": {
                beTong.Rb = 1700;
                beTong.Rbt = 120;
                beTong.Eb = 3250000;
                break;
            }
            case "B35 - M450": {
                beTong.Rb = 1950;
                beTong.Rbt = 130;
                beTong.Eb = 3450000;
                break;
            }
            case "B40 - M500": {
                beTong.Rb = 2200;
                beTong.Rbt = 140;
                beTong.Eb = 3600000;
                break;
            }
            case "B45 - M600": {
                beTong.Rb = 2500;
                beTong.Rbt = 145;
                beTong.Eb = 3750000;
                break;
            }
        }

        return beTong;
    }

    infoThep(typeThep) {
        var thep = {
            Rs: 22500,
            Rsc: 22500,
            Es: 21000000
        }
        switch (typeThep) {
            case "CI - AI": {
                thep.Rs = 22500;
                thep.Rsc = 22500;
                thep.Es = 21000000;
                break;
            }
            case "CII - AII": {
                thep.Rs = 28000;
                thep.Rsc = 28000;
                thep.Es = 21000000;
                break;
            }
            case "CIII - AIII (6-8)": {
                thep.Rs = 35500;
                thep.Rsc = 35500;
                thep.Es = 20000000;
                break;
            }
            case "CIII - AIII (10-40)": {
                thep.Rs = 36500;
                thep.Rsc = 36500;
                thep.Es = 20000000;
                break;
            }
            case "CIV - AIV": {
                thep.Rs = 51000;
                thep.Rsc = 45000;
                thep.Es = 19000000;
                break;
            }
            case "AV": {
                thep.Rs = 68000;
                thep.Rsc = 50000;
                thep.Es = 19000000;
                break;
            }
            case "AVI": {
                thep.Rs = 81500;
                thep.Rsc = 50000;
                thep.Es = 19000000;
                break;
            }
            case "AT - VII": {
                thep.Rs = 98000;
                thep.Rsc = 50000;
                thep.Es = 19000000;
                break;
            }


        }

        return thep;
    }

    infoHeSo(typeBeTong, typeThep) {
        var HeSo = {
            xiR: 1,
            alphaR: 1,
            muyMax: 1
        }

        var beTongOninfoHeSo = this.infoBeTong(typeBeTong);
        var thepOninfoThep = this.infoThep(typeThep);

        var Rb = beTongOninfoHeSo.Rb;
        var Rbt = beTongOninfoHeSo.Rbt;
        var Eb = beTongOninfoHeSo.Eb;

        var Rs = thepOninfoThep.Rs;
        var Rsc = thepOninfoThep.Rsc;
        var Es = thepOninfoThep.Es;

        var xiR = (0.85 - 0.008 * (Rb / 100)) / (1 + (Rs / 40000) * (1 - (0.85 - 0.008 * (Rb / 100)) / 1.1));
        var alphaR = xiR * (1 - 0.5 * xiR);
        var muyMax = xiR * Rb * 100 / Rs;

        HeSo.xiR = Math.round(xiR * 1000) / 1000;
        HeSo.alphaR = Math.round(alphaR * 1000) / 1000;
        HeSo.muyMax = Math.round(muyMax * 1000) / 1000;

        return HeSo;
    }

    TinhDienTichThep(soThanh, duongKinh) {
        var r = duongKinh / 2;
        var res = soThanh * 3.14 * r * r;
        return res;
    }

    KiemTraKetQuaThep() {
        var soThanhOnChange = $("#cboSoThanh option:selected").text();
        var duongKinhOnChange = $("#cboDuongKinh option:selected").text();
        var beamID = this.getBeamIDSelected();
        beamID--;
        var dienTich = this.TinhDienTichThep(soThanhOnChange, duongKinhOnChange);
        dienTich = dienTich / 100;
        dienTich = Math.round(dienTich * 1000) / 1000;
        $('#txtDienTich').val(dienTich);
        var isThep = dienTich >= lstBeams[beamID].As;
        if (isThep){
            $('#spanStatus').text("Thỏa mãn");
            $('#spanDetailsThep').text("(cốt thép yêu cầu " + lstBeams[beamID].As
            + " cm^2)");
        }
        else{
            $('#spanStatus').text("Không thỏa mãn");
            $('#spanDetailsThep').text("(nhỏ hơn cốt thép yêu cầu " + lstBeams[beamID].As
            + " cm^2)");
        }
    }

    //#endregion

    

}

var lstBeams = [
    {
        beamID: 1,
        Ten: "Dầm D1",
        BeTong: "B30 - M400",
        Thep: "CIII - AIII (10-40)",
        indexBeTong: 5,
        indexThep: 4,
        ChieuCaoh: 0.6,
        BeRongb: 0.22,
        BeDaySanhf: 0.1,
        NhipDamL: 6,
        NhipGiuaHaiDaml: 3,
        KhoangCacha: 0.03,
        MuyMin: 0.05,
        MomentM: -11.27,
        Q: 17.15,
        KetQua: "Chưa tính toán",
        As: 0
    },
    {
        beamID: 2,
        Ten: "Dầm D2",
        BeTong: "B30 - M400",
        Thep: "CIII - AIII (10-40)",
        indexBeTong: 5,
        indexThep: 4,
        ChieuCaoh: 0.6,
        BeRongb: 0.22,
        BeDaySanhf: 0.1,
        NhipDamL: 6,
        NhipGiuaHaiDaml: 3,
        KhoangCacha: 0.03,
        MuyMin: 0.05,
        MomentM: 11.28,
        Q: 17.15,
        KetQua: "Chưa tính toán",
        As: 0
    },
    {
        beamID: 3,
        Ten: "Dầm D3",
        BeTong: "B30 - M400",
        Thep: "CIII - AIII (10-40)",
        indexBeTong: 5,
        indexThep: 4,
        ChieuCaoh: 0.6,
        BeRongb: 0.22,
        BeDaySanhf: 0.1,
        NhipDamL: 6,
        NhipGiuaHaiDaml: 3,
        KhoangCacha: 0.03,
        MuyMin: 0.05,
        MomentM: -18.15,
        Q: 17.15,
        KetQua: "Chưa tính toán",
        As: 0
    },
    {
        beamID: 4,
        Ten: "Dầm D4",
        BeTong: "B30 - M400",
        Thep: "CIII - AIII (10-40)",
        indexBeTong: 5,
        indexThep: 4,
        ChieuCaoh: 0.6,
        BeRongb: 0.2,
        BeDaySanhf: 0.1,
        NhipDamL: 6,
        NhipGiuaHaiDaml: 3,
        KhoangCacha: 0.03,
        MuyMin: 0.05,
        MomentM: 30,
        Q: 100,
        KetQua: "Chưa tính toán",
        As: 0
    },
    {
        beamID: 5,
        Ten: "Dầm D5",
        BeTong: "B30 - M400",
        Thep: "CIII - AIII (10-40)",
        indexBeTong: 5,
        indexThep: 4,
        ChieuCaoh: 0.6,
        BeRongb: 0.2,
        BeDaySanhf: 0.1,
        NhipDamL: 6,
        NhipGiuaHaiDaml: 3,
        KhoangCacha: 0.03,
        MuyMin: 0.05,
        MomentM: 35,
        Q: 100,
        KetQua: "Chưa tính toán",
        As: 0
    }
]

//#region Các hàm Process
function TinhThepHCN(h, a, b, Rb, M, alphaR, xiR, Rs, nguyMin, nguyMax) {
    var kq = 0;
    var h0 = h - a;
    var alphaM = Math.abs(M) / (Rb * b * h0 * h0);

    if (alphaM > alphaR) {
        kq = 0;
    }
    else {
        var xi = 1 - Math.sqrt(1 - 2 * alphaM);
        var _As = xi * Rb * b * h0 / Rs;
        // Tính hàm lượng cốt thép
        var nguy = _As * 100 / (b * h0);
        
        if (nguyMin <= nguy && nguy < nguyMax) {
            kq = _As;
        }
        else {
            kq = 0.05 * b * h0 / 100; // Tính theo giá trị nguy min
        }
    }
    return kq;
}
function TinhThepHCT(L, alphaR, b, h, M, hf, Rb, h0, XiR, Rs, nguyMin, nguyMax) {
    var kq = 0;
    // Tính Sf
    var sf = 6 * hf;
    var sf2 = L / 6;
    sf = Math.min(sf, sf2);
    // Tính bf
    var bf = b + 2 * sf;
    // Tính Mf
    var Mf = Rb * bf * hf * (h0 - 0.5 * hf);

    if (M < Mf) {
        // Tính theo tiết diện chữ nhật do trục trung hòa đi qua bản cánh
        kq = this.TinhThepHCN(h, h - h0, b, Rb, M, alphaR, XiR, Rs, nguyMin, nguyMax);
    }
    else {
        // Trục trung hòa đi qua sườn tính theo chữ T
        var alphaM = (M - Rb * (bf - b) * hf * (h0 - 0.5 * hf)) / (Rb * b * h0 * h0);
        if (alphaM < alphaR) {
            var xi = 1 - Math.sqrt(1 - 2 * alphaM);
            if (xi < XiR) {
                var x = xi * h0;
                kq = (Rb * b * x + Rb * (bf - b) * hf) / Rs;
            }
            else {
                kq = 0.05 * b * h0 / 100; // Tính theo giá trị muy min
            }
        }
        // Chọn lại chiều cao H
        kq = 0;
    }
    return kq;
}

function KiemTraCotDai(a, Qmax, Rb, Rbt, Rsw, s, Es, Eb, b, h, phi, n) {
    if (Qmax < 0.3 * Rb * b * (h - a)) {
        var Qmin = 0.5 * Rbt * b * (h - a);
        var Asw = Math.PI * (phi / (2 * 1000)) * (phi / (2 * 1000))

        var Qsw = Rsw * Asw / s;
        var Mw = n * Asw / (b * s);
        var alpha = Es / Eb;
        var phi_b1 = 1 - 0.01 * Rb / 100;
        var phi_w1 = 1 + 5 * alpha * Mw;
        if (Qmax < Qmin) {
            return "Dầm đủ khả năng chịu cắt.\n Đặt cốt đai theo cấu tạo.";
        }
        else {
            if (Qmax < (0.3 * phi_w1 * phi_b1 * Rb * b * h)) {
                return "Cốt đai đã chọn đạt yêu cầu.";
            }
            else {
                return "Không đạt yêu cầu.\n Chọn lại cốt đai.";
            }
        }
    }
    else {
        return "Dầm không đủ khả năng chịu\n ứng suất nén chính.\n Chọn lại tiết diện";
    }
}
//#endregion