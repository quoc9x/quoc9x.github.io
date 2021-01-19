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
        $('#btnSave').click(this.btnSaveOnClick.bind(this));
        $('#btnEdit').click(this.btnEditOnClick.bind(this));
        $('#btnCancel').click(this.btnCancelOnClick.bind(this));
        $('.title-close-bottom').click(this.btnCancelOnClick.bind(this));
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
    }

    

    btnEditOnClick() {
        
    }




    /**
     * Thực hiện cất dữ liệu:
     * */
    btnSaveOnClick() {
        var beam = {};
        beam.STT = lstBeams.length;
        beam.TenDam = $("#txtEmployeeCode").val();
        beam.ChieuCaoh = $("#txtChieuCaoh").val();
        beam.BeRongb = $("#txtBeRongb").val();
        beam.BeDaySanhf = $("#txtBeDaySanhf").val();
        beam.NhipDamL = $("#txtNhipDamL").val();
        beam.KhoangCacha = $("#txtKhoangCacha").val();

        beam.BeTong = $( "#cboBeTong option:selected" ).text();
        beam.Thep = $( "#cboBeTong option:selected" ).text();
        // Thực hiện cất dữ liệu vào database: 
        lstBeams.push(beam);
        // Load lại dữ liệu:
        this.loadData();
        this.hideDialogDetail();
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
        var employeeCode = null;
        var trSelected = $("#tbEmployeeList tr.row-selected");
        if (trSelected.length > 0){
            employeeCode = $(trSelected).children()[0].textContent;
        }
        return employeeCode;
    }


    getID() {
        var id = $("#tbEmployeeList tr.row-selected[employeeID]");
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
    /*
     * Hiển thị dialog chi tiết 
     * Author: quocnvc
     * */
    showDialogDetail() {
        // Clean tất cả các giá trị cũ trên các input trong form:
        $('.dialog input').val(null);
        $('.dialog-modal').show();
        $('.dialog').show();
        $("#txtEmployeeCode").focus();
    }

    /*
     * Ẩn dialog chi tiết 
     * Author: quocnvc
     * */
    hideDialogDetail() {
        $('.dialog-modal').hide();
        $('.dialog').hide();
    }


}

// Hàm load dữ liệu:
function loadData() {
    
}

var lstBeams = [
    {
        STT: 1,
        Ten: "Dầm D1",
        BeTong: "B15",
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
        BeTong: "B15",
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
        BeTong: "B15",
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
        BeTong: "B15",
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
        BeTong: "B15",
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