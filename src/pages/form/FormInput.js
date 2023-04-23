import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import BaseInput from "../../components/BaseInput";
import PDFViewer from "../../components/PDFViewer";
export default function FormInput() {
  const [formObj, setFormObj] = useState({
    soKyHieuVaHoSo: {
      label: "Số và ký hiệu hồ sơ",
      value: "",
    },
    soCuaVanBan: {
      label: "Số của văn bản ( Dùng để tìm kiếm file )",
      value: "",
    },
    tieuDeVanBan: {
      label: "Tiêu đề văn bản",
      value: "",
    },
    toSo: {
      label: "Tờ số",
      value: "",
    },
    maHoSo: {
      label: "Mã hồ sơ",
      value: "",
    },
    sttVanBanTrongHoSo: {
      label: "Số tứ tự văn bản trong hồ sơ",
      value: "",
    },
    dateVanBan: {
      label: "Ngày tháng năm văn bản",
      value: "",
    },
    tenCoQuanBanHanhVanBan: {
      label: "Tên cơ quan tổ chức ban hành văn bản",
      value: "",
    },
    soLuongTrang: {
      label: "Số lượng trang của văn bản",
      value: "",
    },
  });
  const handleChangeInput = () => {};
  return (
    <>
      <Grid
        container
        // rowSpacing={10}
        // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        height={"calc(100vh - 100.5px)"}
      >
        <Grid item xl={5} xs={5} padding={2}>
          <Box>
            <Button size="small" variant="contained">
              LƯU
            </Button>
            <Button size="small" variant="contained" sx={{ marginLeft: 2 }}>
              TRỞ VỀ
            </Button>
          </Box>
          <Grid container columnSpacing={5} rowGap={8} marginTop={4}>
            {Object.keys(formObj).map((key, index) => {
              return (
                <Grid item md={6} xl={6} sm={12} key={key}>
                  <BaseInput
                    label={formObj[key].label}
                    value="xxx"
                    onChange={handleChangeInput}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid
          item
          xl={7}
          xs={7}
          bgcolor={"green"}
          width={"100%"}
          height={"calc(100vh - 100.5px)"}
          sx={{ overflowY: "scroll" }}
        >
          <PDFViewer />
        </Grid>
      </Grid>
    </>
  );
}
