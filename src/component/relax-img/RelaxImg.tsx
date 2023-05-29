import image from "../../assets/relax2.svg";
import './relax-img.css';
const RelaxImg: React.FC = () => {
  return (
    <div className="relax-img">
      <img src={image} alt="relax-img"/>
      <p>You don't have any tasks, just relax!</p>
    </div>
  );
};

export default RelaxImg;
