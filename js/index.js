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
        $('#btnOk').click(this.btnOkOnClick.bind(this));
        $('#btnEdit').click(this.btnEditOnClick.bind(this));
        $('#btnCancel').click(this.btnCancelOnClick.bind(this));
        $('.title-close-bottom').click(this.btnCancelOnClick.bind(this));
        $('.title-close-bottomM').click(this.btnCancelOnClickM.bind(this));

        $('#cboBeTongM').change(this.cboBeTongMOnChange.bind(this));
        $('#cboThepM').change(this.cboThepMOnChange.bind(this));

        $('#btnBeamProcess').click(this.btnBeamProcessOnClick.bind(this));


        //$("#txtEmployeeCode").blur(this.checkRequired);
        //$("#txtEmployeeName").blur(this.checkRequired);
        // Cách 1: Dùng class
        //$(".required").blur(this.checkRequired);
        // Cách 2: Dùng attribute
        $('#btnDelete').click(this.btnDeleteOnClick.bind(this));
        $("input[required]").blur(this.checkRequired);
        $("table tbody").on("click", "tr", this.rowOnSelect);
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
            <td>`+ items.KhoangCacha + `</td>
            <td>`+ items.MomentM + `</td>
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
        $("#txtNhipDamL").val(3);
        $("#txtKhoangCacha").val(0.03);

        $("#cboBeTong option:selected").val("B12.5 - M150");
        $("#cboThep option:selected").val("CI - AI");

        $("#txtMomentM").val(150);
        /////////////////////////////////////////////////////////////
    }


    btnInFoMatOnClick() {

        this.showDialogDetailM();

    }



    btnEditOnClick() {
        var self = this;
        this.FormMode = "edit";
        // Lấy mã nhân viên được chọn:
        var beamID = this.getEmployeeCodeSelected();
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
            $("#txtKhoangCacha").val(beam.KhoangCacha);

            $("#cboBeTong option:selected").val(beam.BeTong);
            $("#cboThep option:selected").val(beam.Thep);

            $("#txtMomentM").val(beam.MomentM);

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
            debugger;
            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass("required-error")) {
                isValid = false; 
            }
        })
        // Thực hiện cất dữ liệu vào database:
        // Kiểm tra xem sửa hay thêm mới
        if (isValid){
            if (this.FormMode === "add") {
                var beam = {};
                beam.beamID = lstBeams.length + 1;
    
                beam.Ten = $("#txtTenDam").val();
                beam.ChieuCaoh = $("#txtChieuCaoh").val();
                beam.BeRongb = $("#txtBeRongb").val();
                beam.BeDaySanhf = $("#txtBeDaySanhf").val();
                beam.NhipDamL = $("#txtNhipDamL").val();
                beam.KhoangCacha = $("#txtKhoangCacha").val();
    
                beam.BeTong = $("#cboBeTong option:selected").text();
                beam.Thep = $("#cboThep option:selected").text();
    
                beam.MomentM = $("#txtMomentM").val();
    
                lstBeams.push(beam);
            }
            else if (this.FormMode === "edit") {
                var beamID = this.getEmployeeCodeSelected();
                beamID--;
                lstBeams[beamID].Ten = $("#txtTenDam").val();
                lstBeams[beamID].ChieuCaoh = $("#txtChieuCaoh").val();
                lstBeams[beamID].BeRongb = $("#txtBeRongb").val();
                lstBeams[beamID].BeDaySanhf = $("#txtBeDaySanhf").val();
                lstBeams[beamID].NhipDamL = $("#txtNhipDamL").val();
                lstBeams[beamID].KhoangCacha = $("#txtKhoangCacha").val();
    
                lstBeams[beamID].BeTong = $("#cboBeTong option:selected").text();
                lstBeams[beamID].Thep = $("#cboThep option:selected").text();
    
                lstBeams[beamID].MomentM = $("#txtMomentM").val();
            }
            // Load lại dữ liệu:
            this.loadData();
            this.hideDialogDetail();
        }
        
    }

    btnOkOnClick() {
        this.hideDialogDetailM();
    }


    btnDeleteOnClick() {
        var self = this;
        // Lấy mã nhân viên được chọn:
        var beamID = this.getEmployeeCodeSelected();
        if (beamID) {
            lstBeams.splice(beamID - 1,1);
            this.loadData();
        } else {
            alert('Chưa có dầm nào được chọn');
        }

    }

    /**
     * Lấy mã nhân viên được chọn trong danh sách
     * */
    getEmployeeCodeSelected() {
        // 1. Xác định nhân viên nào được chọn:
        var beamID = null;
        var trSelected = $("#tbBeamList tr.row-selected");
        if (trSelected.length > 0) {
            beamID = $(trSelected).children()[0].textContent;
        }
        return beamID;
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
        $("#txtTenDam").focus();
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

    cboBeTongMOnChange() {
        var index = $("#cboBeTongM option:selected").val();
        index = parseInt(index);
        switch (index) {
            case 0: {
                $('#txtRb').val(750);
                $('#txtRbt').val(66);
                $('#txtEb').val(2100000);
                break;
            }
            case 1: {
                $('#txtRb').val(850);
                $('#txtRbt').val(75);
                $('#txtEb').val(2300000);
                break;
            }
            case 2: {
                $('#txtRb').val(1150);
                $('#txtRbt').val(90);
                $('#txtEb').val(2700000);
                break;
            }
            case 3: {
                $('#txtRb').val(1450);
                $('#txtRbt').val(105);
                $('#txtEb').val(3000000);
                break;
            }
            case 4: {
                $('#txtRb').val(1700);
                $('#txtRbt').val(120);
                $('#txtEb').val(3250000);
                break;
            }
            case 5: {
                $('#txtRb').val(1950);
                $('#txtRbt').val(130);
                $('#txtEb').val(3450000);
                break;
            }
            case 6: {
                $('#txtRb').val(2200);
                $('#txtRbt').val(140);
                $('#txtEb').val(3600000);
                break;
            }
            case 7: {
                $('#txtRb').val(2500);
                $('#txtRbt').val(145);
                $('#txtEb').val(3750000);
                break;
            }
        }

        var Rb = $('#txtRb').val();
        var Rbt = $('#txtRbt').val();
        var Eb = $('#txtEb').val();

        var Rs = $('#txtRs').val();
        var Rsc = $('#txtRsc').val();
        var Es = $('#txtEs').val();

        var xiR = (0.85 - 0.008 * (Rb / 100)) / (1 + (Rs / 40000) * (1 - (0.85 - 0.008 * (Rb / 100)) / 1.1));
        var alphaR = xiR * (1-0.5*xiR);
        var muyMax = xiR * Rb * 100 / Rs;

        $('#txtxiR').val(Math.round(xiR * 1000) / 1000);
        $('#txtalphaR').val(Math.round(alphaR * 1000) / 1000);
        $('#txtmuyMax').val(Math.round(muyMax * 1000) / 1000);

    }


    cboThepMOnChange() {
        var index = $("#cboThepM option:selected").val();
        index = parseInt(index);
        switch (index) {
            case 0: {
                $('#txtRs').val(22500);
                $('#txtRsc').val(22500);
                $('#txtEs').val(21000000);
                break;
            }
            case 1: {
                $('#txtRs').val(28000);
                $('#txtRsc').val(28000);
                $('#txtEs').val(21000000);
                break;
            }
            case 2: {
                $('#txtRs').val(33500);
                $('#txtRsc').val(33500);
                $('#txtEs').val(20000000);
                break;
            }
            case 3: {
                $('#txtRs').val(36500);
                $('#txtRsc').val(36500);
                $('#txtEs').val(20000000);
                break;
            }
            case 4: {
                $('#txtRs').val(51000);
                $('#txtRsc').val(35000);
                $('#txtEs').val(19000000);
                break;
            }
            case 5: {
                $('#txtRs').val(68000);
                $('#txtRsc').val(50000);
                $('#txtEs').val(19000000);
                break;
            }
            case 6: {
                $('#txtRs').val(81500);
                $('#txtRsc').val(50000);
                $('#txtEs').val(19000000);
                break;
            }
            case 7: {
                $('#txtRs').val(98000);
                $('#txtRsc').val(50000);
                $('#txtEs').val(19000000);
                break;
            }

            
        }

        var Rb = $('#txtRb').val();
        var Rbt = $('#txtRbt').val();
        var Eb = $('#txtEb').val();

        var Rs = $('#txtRs').val();
        var Rsc = $('#txtRsc').val();
        var Es = $('#txtEs').val();

        var xiR = (0.85 - 0.008 * (Rb / 100)) / (1 + (Rs / 40000) * (1 - (0.85 - 0.008 * (Rb / 100)) / 1.1));
        var alphaR = xiR * (1 - 0.5 * xiR);
        var muyMax = xiR * Rb * 100 / Rs;

        $('#txtxiR').val(Math.round(xiR * 1000) / 1000);
        $('#txtalphaR').val(Math.round(alphaR * 1000) / 1000);
        $('#txtmuyMax').val(Math.round(muyMax * 1000) / 1000);

    }

    btnBeamProcessOnClick() {
        beamProcess = new BeamProcess();
        for (const beam of lstBeams){
            beamProcess.TinhThepHCN
            beam.KetQua = "Đã tính toán xong - Xem kết quả";
        }
        this.loadData();
    }


}

var lstBeams = [
    {
        beamID: 1,
        Ten: "Dầm D1",
        BeTong: "B15 - M200",
        Thep: "CII",
        ChieuCaoh: 0.6,
        BeRongb: 0.2,
        BeDaySanhf: 0.1,
        NhipDamL: 3,
        KhoangCacha: 0.03,
        MomentM: 125,
        KetQua: "Chưa tính toán"
    },
    {
        beamID: 2,
        Ten: "Dầm D2",
        BeTong: "B15 - M200",
        Thep: "CII",
        ChieuCaoh: 0.6,
        BeRongb: 0.2,
        BeDaySanhf: 0.1,
        NhipDamL: 3,
        KhoangCacha: 0.03,
        MomentM: 125,
        KetQua: "Chưa tính toán"
    },
    {
        beamID: 3,
        Ten: "Dầm D3",
        BeTong: "B15 - M200",
        Thep: "CII",
        ChieuCaoh: 0.6,
        BeRongb: 0.2,
        BeDaySanhf: 0.1,
        NhipDamL: 3,
        KhoangCacha: 0.03,
        MomentM: 125,
        KetQua: "Chưa tính toán"
    },
    {
        beamID: 4,
        Ten: "Dầm D4",
        BeTong: "B15 - M200",
        Thep: "CII",
        ChieuCaoh: 0.6,
        BeRongb: 0.2,
        BeDaySanhf: 0.1,
        NhipDamL: 3,
        KhoangCacha: 0.03,
        MomentM: 125,
        KetQua: "Chưa tính toán"
    },
    {
        beamID: 5,
        Ten: "Dầm D5",
        BeTong: "B15 - M200",
        Thep: "CII",
        ChieuCaoh: 0.6,
        BeRongb: 0.2,
        BeDaySanhf: 0.1,
        NhipDamL: 3,
        KhoangCacha: 0.03,
        MomentM: 125,
        KetQua: "Chưa tính toán"
    }
]