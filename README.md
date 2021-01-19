# GpsWebUi - Dự án Frontend website GPS với Angular

Dự án này được xây dựng với framework [Angular CLI](https://github.com/angular/angular-cli) phiên bản 9.1.7.

## Cách chạy website

Sau khi download về, chạy lệnh `ng serve` để chạy project. Mở trình duyệt web và truy cập `http://localhost:4200/`. Hoặc mở 2 terminal chạy lệnh `ng buidl --watch` kết hợp với `lite-server --baseDir="dist/gpsWebUi"` trên terminal thứ 2 để chạy ở chế độ Build với lite-server.

## Tạo các đối tượng

Để thêm 1 component mới, chạy lệnh `ng generate component ten_component`. Nhớ chỉ định đường dẫn trước ten_component (path/ten_component) để tạo component vào 1 thư mục riêng biệt. Đường dẫn gốc là src. Ngoài ra, còn các tùy chọn khác để tạo các loại file khác: `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Cách build

 Chạy lệnh `ng build` để build dự án. Kết quả Build sẽ được lưu vào thư mục `dist/` ngang cấp với thư mục `src`. Sử dụng tham số `--prod` để build bản production(bản chạy).

## Cách test dự án

Chạy lệnh `ng test` để thực hiện unit test thông qua [Karma](https://karma-runner.github.io).

## Thực hiện test end-to-end.

Chạy lệnh `ng e2e` để thực hiện test end-to-end thông qua [Protractor](http://www.protractortest.org/).

## Cấu trúc thư mục bao gồm:

+ src/app: Chứa các file mã nguồn của dự án, được chia thành các thư mục con
    + src/app/core: Đây là module core. Module này được sử dụng bởi app.module. Bao gồm các tài nguyên mà luôn luôn được nạp vào hệ thống như route guard, HTTP Interceptors, các service,....
    + src/app/data: Đây là module chứa các service liên quan đến dữ liệu, các model(schema). Trong thư mục này sẽ chứa các thư mục con để sắp xếp các file tương ứng.
    + src/app/layout: Đây là thư mục chứa các thành phần của giao diện như header, footer, nav.... Trong đó sẽ có các thư mục con để tổ chức các file tương ứng.
    + src/app/shared: Đây là module chứa các đối tượng dùng chung. Bao gồm các component như message box, spinner.... Đồng thời cũng chứa các service dùng chung như validation service...
    + src/app/modules: Đây là thư mục chứa các module bên trong nó. Mỗi module sẽ bao gồm các component, page, hoặc các module con. Ví dụ như Giám sát, lộ trình, báo cáo, cấu hình....
+ src/assets: Đây là thư mục chứa các tài nguyên của website như hình ảnh, các file style hoặc các file dữ liệu cấu hình
+ src/environments: Là thư mục chứa 2 file environment.ts, environment.prod.ts chứa các thông tin cấu hình chung.
+ src/styles: Đây là thư mục chứa các file scss được cấu trúc theo từng loại themes(thư mục con).

Trong mỗi thư mục con cần có các file README.md để mô tả mục đích của thư mục này.

## Các hướng dẫn khác

Để biết chi tiết các tham số của lệnh `ng`, hãy chạy `ng help`, hoặc truy cập [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Mọi sự thay đổi, vui lòng thêm vào file CHANGELOGS.md

CHANGELOG.md là file lưu lại các thay đổi quan trọng của dự án. Vui lòng thêm vào trong file này các mục thay đổi quan trọng theo cấu trúc có sãn.