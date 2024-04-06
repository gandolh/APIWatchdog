import { Button, Card } from "@mantine/core";

const AddAppCard = () => {
    function openModal(){
        console.log('openModal')
    }

  return (
      <Card onClick={openModal} className="flex justify-center items-center fw-bold ">
         Create App
      </Card>
  );
};

export default AddAppCard;
