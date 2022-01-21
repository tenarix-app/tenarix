import React, { useEffect, useRef, useReducer } from "react";
import { Container, Grid, Loading, Head, Txt } from "components/src/Elements";
import { initialState, reducer } from "./helper";
import { useLang, useTheme } from "context-providers";
import { SpinnerDotted } from "spinners-react";
import { useNavigate } from "react-router-dom";
import { Card } from "components";

const { api } = window.bridge;

export const Home: React.FC = () => {
  const mounted = useRef(false);
  const navigation = useNavigate();
  const { colors } = useTheme();
  const { lang } = useLang();
  const [{ loading, data }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    mounted.current = true;
    api.on("res:home", (_e, res) => {
      if (mounted.current) {
        dispatch({ type: "setData", payload: res });
        dispatch({ type: "setLoading", payload: false });
      }
    });
    api.send("get:home");
    return () => {
      api.removeAllListeners("res:home");
      mounted.current = false;
    };
  }, []);

  return (
    <Container
      bg={colors.background1}
      scrollColor={colors.primary}
      padding="0px 10px 40px 10px"
    >
      {loading ? (
        <Loading>
          <SpinnerDotted
            size={100}
            thickness={180}
            speed={100}
            color={colors.secondary}
          />
        </Loading>
      ) : (
        <>
          <Head>
            <Txt fs="16px" bold color={colors.fontPrimary}>
              {lang.home.head}
            </Txt>
          </Head>

          <Grid margin="10px 0px 0px 5px">
            {data.popular &&
              data.popular.length !== 0 &&
              data.popular.map((e, i) => (
                <Card
                  colors={colors}
                  pointer
                  key={i}
                  img={e.img}
                  onClick={() => {
                    navigation(`/details/${e.route}`);
                  }}
                  type={e.type}
                  demography={e.demography}
                  title={e.title}
                  score={e.score}
                />
              ))}
          </Grid>
        </>
      )}
    </Container>
  );
};