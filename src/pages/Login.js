import React from "react";
import styled from "styled-components";
import { Text } from "../elements";

const Login = () => {
  return (
    <React.Fragment>
      <Container>
        <Text type="title" fontSize="24px" fontWeight="bold">
          로그인
        </Text>
        <BtnGrid>
          <KakaoBtn></KakaoBtn>
          <NaverBtn></NaverBtn>
        </BtnGrid>
      </Container>
    </React.Fragment>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  z-index: -1;
`;

const BtnGrid = styled.div`
  display: flex;
  flex-direction: column;
`;
const KakaoBtn = styled.button`
  width: 300px;
  height: 45px;
  border: none;
  cursor: pointer;
  background-image: url("https://lh3.googleusercontent.com/pw/AM-JKLV8Hy5KFTHBB_lD5vpZVJLuKljFbcad_Vq9cL0i7AoE7NuRC5qYktOMTGQr2xgzTNhgV3ojbk8RezbSVolPLyzM1w57pltQ653Acfq3NvIbBnLZi7AL9iIspPnuSfFtt8w-r9RzwT-y-tQM7CNAMD91=w300-h45-no?authuser=0");
`;

const NaverBtn = styled.button`
  width: 300px;
  height: 45px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  background-image: url("https://lh3.googleusercontent.com/9LBwst47gdqtt8OVVnOUytRtw6TVv1Pvhttue6vz2GWlqLSSVunytPNw5lITe-ioVxbXOsSoiOD--GWjkNkB00KfJLlwKpNfsAnuR32zSi6xqN5MOS2JZ3bpwaAdwbIR_0VEwCbjQ0zO46Fws0nPFwLN9pvAbN8gvaFRpjiM4BCM3vrhWSNK-kvJZipiNcJmX1Af-4xSshaP7KqDuV3UxsmAE4RPUnlcOiEbGwY3BhOrJNydkGpSs1YT-4dcHvMKQjk-XPiJlO7osEguSCH3xC6Xg3E-zALkBb1AQWpn06VEV0qxJXLIixMhdXdzcaKfd94AFTfp_b6XO-IOsdek4L-CU63PgIC3NwguYcZoy_qmm7jJPdl1euwpfibe7oPbG2ORVrDMIUMm18grlBUl_L6u88_C6HMgfnDM8AsvjsdCw0LO56bq5RrvDf65J1-JPDy-iOvtSF51bv9NCr4wlHm4Hpv6YeZTyNDWHK7RI1W9eAa-pCdCyGOxY3HD7H4kht--D_P6wXTCiky6d0ips0l10YJUWyosZz9WnVfO1IJcOUEzCBtizwtuGs_mS8CFJ0zxFE5zYY5YZIXjdhYCc3pRSS6cGCugfwmndOQ0D5xVYCQ9QHJmXuLOXPitRlExzIoXTRSvqW70YEtZ_5CjnTG-BAzibxQKLab-ModuNSeZ-nLujB_WtdNTbFYH2S2h67qJy0Bu5shPKj2gVUBJiFg=w300-h45-no?authuser=0");
`;
export default Login;
