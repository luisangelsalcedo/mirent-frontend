import avatarImg from "../../assets/img/avatar.jpg";
import { Btn, Avatar } from "../../components/designSystem";
import "./credits-page.scss";

export const CreditsPage = () => (
  <div className="credits-page">
    <Avatar img={avatarImg} size="20rem" />
    <span>Developed by</span>
    <br />
    <div>
      <Btn
        label="luisangelsalcedo"
        fa="github-alt"
        btn="outline"
        onClick={() =>
          window.open("https://github.com/luisangelsalcedo", "_blank")
        }
        className="btn-block"
      />

      <Btn
        label="Repositorio"
        fa="code-fork"
        btn="main"
        onClick={() =>
          window.open(
            "https://github.com/luisangelsalcedo/mirent-frontend",
            "_blank"
          )
        }
        className="btn-block"
      />
    </div>
  </div>
);
