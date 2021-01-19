$(document).ready(function () {
    //alert('hello!');
    // loadData(2);
    //loadData();
    var customerJS = new CustomerJS();
    customerJS.loadData();
})
// gọi hàm ready nhưng sẽ load hết dữ liệu của trang trước
//loadData(1);

class CustomerJS {
    constructor() {

    }

    //loadData() {
    //    $.each(data, function (index, item) {
    //        var trHTML = $(`<tr>
    //                <td>`+ item.CustomerCode + `</td>
    //                <td>`+ item.CustomerName + `</td>
    //                <td>`+ item.Email + `</td>
    //                <td>`+ item.Mobile + `</td>
    //                <td>`+ item.Address + `</td>
    //            </tr>`);
    //        $('.gridbar tbody').append(trHTML);
    //    })
    //}

    loadData() {
        //#region syntax ajax
        // Lấy dữ liệu trên server thông qua lời gọi từ API Service
        //$.ajax({
        //    url: "",        // Url               - bắt buộc
        //    method: "",     // Phương thức       - bắt buộc 
        //    data: "",       // Tham số truyền qua body request
        //    contentType: "application/json",// Kiểu dữ liệu trả về
        //    dataType: "plain/text"                // Kiểu dữ liệu truyền lên
        //}).success(function (response){

        //    }).fail(function (response) {

        //    })
        //#endregion

        // debugger;
        $.ajax({
            // nếu gọi api trong cùng project thì chỉ cần /api/Employee
            url: "http://localhost:15926/customer",        // Url               - bắt buộc
            method: "GET",     // Phương thức       - bắt buộc 
            data: "",       // Tham số truyền qua body request
            contentType: "application/json",// Kiểu dữ liệu trả về
            dataType: "",                // Kiểu dữ liệu truyền lên
            //success: function () {
            //    debugger;  
            //},
            //fail: function () {
            //    debugger;
            //}
        }).done(function (response) {
            $('.gridbar tbody').empty();
            $.each(response, function (index, item) {
                var trHTML = $(`<tr>
                    <td>`+ item.CustomerCode + `</td>
                    <td>`+ item.CustomerName + `</td>
                    <td>`+ item.Email + `</td>
                    <td>`+ item.Mobile + `</td>
                    <td>`+ item.CompanyName + `</td>
                </tr>`);
                $('.gridbar tbody').append(trHTML);
            })
            //debugger;
        }).fail(function (response) {
            //debugger;
        })

        //#region
        //$('.gridbar tbody').empty();
        //$.each(employees, function (index, item) {
        //    var trHTML = $(`<tr>
        //            <td>`+ item.EmployeeCode + `</td>
        //            <td>`+ item.EmployeeName + `</td>
        //            <td>`+ item.Email + `</td>
        //            <td>`+ item.Mobile + `</td>
        //            <td>`+ item.CompanyName + `</td>
        //        </tr>`);
        //    $('.gridbar tbody').append(trHTML);
        //})
        //#endregion
    }

    add(param) {

    }
    edit() {

    }
    delete() {

    }
}

function loadData(msg) {
    //alert(msg);
    var trHTML = $(`<tr>
                    <td>NV001</td>
                    <td>Nguyễn Văn Cường Quốc</td>
                    <td>Hà Tĩnh</td>
                    <td>cqvnno1@gmail.com</td>
                    <td>0968604182</td>
                </tr>`);
    // debugger;
    $.each(data, function (index, item) {
        var trHTML = $(`<tr>
                    <td>`+ item.CustomerCode +`</td>
                    <td>`+ item.CustomerName +`</td>
                    <td>`+ item.Email +`</td>
                    <td>`+ item.Mobile +`</td>
                    <td>`+ item.Address +`</td>
                </tr>`);
        $('.gridbar tbody').append(trHTML);
        // debugger;
    })
    for (var i = 0; i < 100; i++) {
        //var trHTML = $(`<tr>
        //            <td>NV001</td>
        //            <td>Nguyễn Văn Cường Quốc</td>
        //            <td>Hà Tĩnh</td>
        //            <td>cqvnno1@gmail.com</td>
        //            <td>0968604182</td>
        //        </tr>`);
        //// chèn xuống dưới
        //$('.gridbar tbody').append(trHTML);

        // chèn lên trên
        //$('.gridbar tbody').prepend(trHTML);
    }

}

var data = [
    {
        CustomerCode: "NV0001",
        CustomerName: "Nguyễn Văn Cường Quốc",
        Email: "quocnvc@gmail.com",
        Mobile: "0968604182",
        Address: "Hà Nội"
    },
    {
        CustomerCode: "NV0002",
        CustomerName: "Nguyễn Văn Cường",
        Email: "quocnvc@gmail.com",
        Mobile: "0968604182",
        Address: "Hà Nội"
    },
    {
        CustomerCode: "NV0003",
        CustomerName: "Nguyễn Văn Quốc",
        Email: "quocnvc@gmail.com",
        Mobile: "0968604182",
        Address: "Hà Nội"
    }
]