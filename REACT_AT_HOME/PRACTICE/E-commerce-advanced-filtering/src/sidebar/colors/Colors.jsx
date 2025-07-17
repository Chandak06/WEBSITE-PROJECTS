import "./Colors.css";
import Input from "../../components/Input";

const Colors = ({ handleChange }) => {
  return (
    <>
      <div>
        <h2 className="sidebar-title color-title">Colors</h2>
        <Input
        handleChange={handleChange}
        value=""
        title="All"
        name="test1"
        // color="linear-gradient(to bottom left, blue, crimson)"
        color="linear-gradient(to bottom left,light blue,light green)"
        
        />


        <Input
          handleChange={handleChange}
          value="black"
          title="Black"
          name="test1"
          color="black"
        />

        <Input
          handleChange={handleChange}
          value="blue"
          title="Blue"
          name="test1"
          color="blue"
        />

        <Input
          handleChange={handleChange}
          value="red"
          title="Red"
          name="test1"
          color="red"
        />

        <Input
          handleChange={handleChange}
          value="green"
          title="Green"
          name="test1"
          color="green"
        />

         <Input
        handleChange={handleChange}
        value="white"
        title="White"
        name="test1"
        color="white"
        border="2px solid black"
      />
      </div>
    </>
  );
};

export default Colors;