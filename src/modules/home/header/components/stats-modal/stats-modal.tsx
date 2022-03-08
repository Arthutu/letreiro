import { CustomModal } from "common/components/custom-modal";
import { StatsModalContent } from "./content";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const StatsModal = ({
  open,
  setIsOpen,
  title,
}: Props): JSX.Element => {
  return (
    <CustomModal open={open} setIsOpen={setIsOpen} title={title}>
      <StatsModalContent />
    </CustomModal>
  );
};