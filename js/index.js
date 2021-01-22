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
            <td>`+ items.STT + `</td>
            <td>`+ items.Ten + `</td>
            <td>`+ items.BeTong + `</td>
            <td>`+ items.Thep + `</td>
            <td>`+ items.ChieuCaoh + `</td>
            <td>`+ items.BeRongb + `</td>
            <td>`+ items.BeDaySanhf + `</td>
            <td>`+ items.NhipDamL + `</td>
            <td>`+ items.KhoangCacha + `</td>
            <td>`+ items.MomentM + `</td>
            <td>`+ "Chưa được tính toán" + `</td>
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
        var beamtemplate = lstBeams[0];
        var countBeam = lstBeams.length + 1;
        $("#txtTenDam").val("Dầm D" + countBeam);
        $("#txtChieuCaoh").val(beamtemplate["ChieuCaoh"]);
        $("#txtBeRongb").val(beamtemplate["BeRongb"]);
        $("#txtBeDaySanhf").val(beamtemplate["BeDaySanhf"]);
        $("#txtNhipDamL").val(beamtemplate["NhipDamL"]);
        $("#txtKhoangCacha").val(beamtemplate["KhoangCacha"]);

        $("#cboBeTong option:selected").val(beamtemplate["BeTong"]);
        $("#cboThep option:selected").val(beamtemplate["Thep"]);

        $("#txtMomentM").val(beamtemplate["MomentM"]);
        /////////////////////////////////////////////////////////////
    }


    btnInFoMatOnClick() {

        this.showDialogDetailM();

    }



    btnEditOnClick() {
        var self = this;
        this.FormMode = "edit";
        // Lấy mã nhân viên được chọn:
        var STT = this.getEmployeeCodeSelected();
        if (STT != null) {
            STT--;
            // Hiển thị form chi tiết:
            this.showDialogDetail();
            // Binding các thông tin của nhân viên lên form
            var beam = lstBeams[STT];
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

        // Thực hiện cất dữ liệu vào database:
        // Kiểm tra xem sửa hay thêm mới
        if (this.FormMode === "add") {
            var beam = {};
            beam.STT = lstBeams.length + 1;

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
            var STT = this.getEmployeeCodeSelected();
            STT--;
            lstBeams[STT].Ten = $("#txtTenDam").val();
            lstBeams[STT].ChieuCaoh = $("#txtChieuCaoh").val();
            lstBeams[STT].BeRongb = $("#txtBeRongb").val();
            lstBeams[STT].BeDaySanhf = $("#txtBeDaySanhf").val();
            lstBeams[STT].NhipDamL = $("#txtNhipDamL").val();
            lstBeams[STT].KhoangCacha = $("#txtKhoangCacha").val();

            lstBeams[STT].BeTong = $("#cboBeTong option:selected").text();
            lstBeams[STT].Thep = $("#cboThep option:selected").text();

            lstBeams[STT].MomentM = $("#txtMomentM").val();
        }
        // Load lại dữ liệu:
        this.loadData();
        this.hideDialogDetail();
    }

    btnOkOnClick() {
        this.hideDialogDetailM();
    }


    btnDeleteOnClick() {
        var self = this;
        // Lấy mã nhân viên được chọn:
        var employeeID = this.getID();
        if (employeeID) {

        } else {

        }

    }

    /**
     * Lấy mã nhân viên được chọn trong danh sách
     * */
    getEmployeeCodeSelected() {
        // 1. Xác định nhân viên nào được chọn:
        var STT = null;
        var trSelected = $("#tbBeamList tr.row-selected");
        if (trSelected.length > 0) {
            STT = $(trSelected).children()[0].textContent;
        }
        return STT;
    }


    getID() {
        var id = $("#tbBeamList tr.row-selected[STT]");
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
        //$("#txtTenDam").focus();
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


}

var lstBeams = [
    {
        STT: 1,
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
        STT: 2,
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
        STT: 3,
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
        STT: 4,
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
        STT: 5,
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