import { Link, redirect, useNavigate } from "react-router-dom";
import { InputStyle } from "../InputStyle";
import "./Intro.css";
import CheckIcon from "@mui/icons-material/Check";

export const Intro = () => {
  const navigateCountdown = useNavigate();

  return (
    <>
      <section className="intro">
        <div className="wrapper">
          <div className="wrapper__inner">
            <div className="intro__additional">
              <span className="label">
                <span className="label-text">
                  <CheckIcon fontSize="small" />
                  Tasks
                </span>
              </span>
            </div>
            <div className="intro__content">
              <h1 className="intro__title">Make your tasks easier to track.</h1>
              <div className="intro__text">
                <p>
                  Organize, automie, prioritize, share and follow tasks on your
                  own or with your friends.
                </p>
              </div>
            </div>
            <div className="form__content">
              <div className="form__content-additional">
                <form action="">
                  <div className="form__inner">
                    <InputStyle
                      placeholder={"name@gmail.com"}
                      type={"email"}
                      btnText={"Get Started"}
                    />
                    <span className="separator"></span>
                    <div className="additions">
                      <div className="btn addintions__label">
                        <Link to={"/Countdown"}>
                          <button className="google-btn">
                            <svg
                              width="22px"
                              height="22px"
                              viewBox="0 0 14 14"
                              role="img"
                              focusable="false"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fill="#4285f4"
                                d="M12.87999908 7.13331113c0-.49332777-.0400763-.85332837-.12666018-1.22665645H7.12000332v2.22664117h3.30664127c-.066603.55335156-.42664081 1.38668711-1.22665655 1.94665632l-.01121182.07452283 1.781156 1.37983931.12340638.01230915c1.13330234-1.04664784 1.78666048-2.5866559 1.78666048-4.41331233"
                              />
                              <path
                                fill="#34a853"
                                d="M7.1199995 12.99998274c1.61997706 0 2.97996124-.53335826 3.9733286-1.45332779l-1.89334397-1.46670278c-.506656.35333936-1.18667175.59999942-2.07998463.59999942-1.58665638 0-2.9333128-1.04663353-3.41335881-2.49329787l-.07036253.0059747-1.85207197 1.43333564-.02421753.06736635c.98665649 1.95998474 3.01332819 3.30668669 5.36001523 3.30668669"
                              />
                              <path
                                fill="#fbbc05"
                                d="M3.70664069 8.18665467c-.1266641-.37332817-.19996928-.7733588-.19996928-1.18667175 0-.41335838.07330146-.81334368.19330516-1.18667175l-.00335496-.07951328-1.87528168-1.45636157-.0613549.0291889c-.40664846.81334368-.63998411 1.7266948-.63998411 2.69335884 0 .96666415.23333565 1.87996937.63998507 2.69331295l1.94665651-1.5066412"
                              />
                              <path
                                fill="#eb4335"
                                d="M7.1199995 3.31996768c1.12664872 0 1.88663348.48666365 2.31998468.89335887l1.69332861-1.65334353C10.0933434 1.59331888 8.73997656.9999829 7.1199995.9999829c-2.34668704 0-4.37335884 1.34665643-5.36001523 3.30664108l1.9399924 1.5066871c.48670993-1.44666397 1.83336635-2.4933434 3.42002274-2.4933434"
                              />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
