
class BeamProcess {

    TinhThepHCN(h,a,b,Rb,M,alphaR,xiR,Rs,nguyMin,nguyMax) {
        var kq = 0;
        var h0 = h-a;
        var alphaM = Math.abs(M) / (Rb*b*h0*h0);

        if (alphaM > alphaR){
            kq = 0;
        }
        else{
            var xi = 1 - Math.sqrt(1 - 2*alphaM);
            var _As = xi * Rb * b * h0 / Rs;
            // Tính hàm lượng cốt thép
            var nguy = _As * 100 / (b*h0);
            
            if (nguyMin <= nguy && nguy < nguyMax){
                kq = _As;
            } 
            else{
                kq = 0.05 * b * h0 / 100; // Tính theo giá trị nguy min
            }
        }
        return kq;
    }

    TinhThepHCT(L,alphaR,b,h,M,hf,Rb,h0,XiR,Rs) {
        var kq = 0;
        // Tính Sf
        var sf = 6 * hf;
        var sf2 = L/6;
        sf = Math.min(sf,sf2);
        // Tính bf
        var bf = b + 2 * sf;
        // Tính Mf
        var Mf = Rb * bf * hf * (h0 - 0.5 * hf);

        if (M < Mf){
            // Tính theo tiết diện chữ nhật do trục trung hòa đi qua bản cánh
            kq = this.TinhThepHCN(h,h-h0,b,Rb,M,alphaR,XiR,Rs);
        }
        else{
            // Trục trung hòa đi qua sườn tính theo chữ T
            var alphaM = (M - Rb * (bf - b) * hf * (h0 - 0.5 * hf)) / (Rb * b * h0 * h0);
            if (alphaM < alphaR){
                var xi = 1 - Math.sqrt(1 - 2 * alphaM);
                if (xi < XiR){
                    var x = xi * h0;
                    kq = (Rb * b * x + Rb * (bf - b) * hf) / Rs;
                }
                else{
                    kq = 0.05 * b *h0/100; // Tính theo giá trị muy min
                }
            }
            // Chọn lại chiều cao H
            kq = 0;
        }
        return kq;
    }


}