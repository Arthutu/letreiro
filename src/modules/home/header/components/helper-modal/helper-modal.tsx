import { Box, Divider, Modal, Stack, Typography } from "@mui/material";
import { HelperModalContent } from "./content";
import CloseIcon from "@mui/icons-material/Close";
import { CustomModal } from "common/components/custom-modal";

interface Props {
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

export const HelperModal = ({ open, setIsOpen, title }: Props): JSX.Element => {
  return (
    <CustomModal open={open} setIsOpen={setIsOpen} title={title}>
      <HelperModalContent />
    </CustomModal>
  );
};
