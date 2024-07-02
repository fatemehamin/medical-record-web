import React, { useCallback, useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { ModalDelete } from "./FormModals";
import { addHighlight, deleteHighlight } from "../features/medicalDoc/action";
import ButtonText from "../components/ButtonText";
import BasicModal from "../components/Modal";
import Input from "./Input";
import Btn from "./Btn";

const HighLights = ({ setOpenModalAddHighlight, openModalAddHighlight }) => {
  const [openModalDelete, setOpenModalDelete] = useState(null);
  const [seeAll, setSeeAll] = useState(false);
  const [highlight, sethighlight] = useState("");

  const { username } = useSelector((state) => state.auth);
  const { currentDoc } = useSelector((state) => state.medicalDoc);

  const dispatch = useDispatch();

  const handleCloseModalDelete = useCallback(
    () => setOpenModalDelete(null),
    []
  );

  const handleCloseAddHighlight = useCallback(
    () => setOpenModalAddHighlight(false),
    []
  );

  const handleSeeAll = useCallback(() => setSeeAll(true), []);

  const handleDelete = useCallback(
    (h) => {
      dispatch(deleteHighlight({ highlight_id: h.id, id: currentDoc.id }));
      setOpenModalDelete(null);
    },
    [currentDoc]
  );

  const handleAddHighlight = useCallback(() => {
    dispatch(addHighlight({ id: currentDoc.id, highlight }));
    setOpenModalAddHighlight(false);
  }, [currentDoc, highlight]);

  const onChangeHighlight = useCallback(
    (e) => sethighlight(e.target.value),
    []
  );

  const listHighlights = useCallback(
    [...currentDoc?.highlights]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((h, index) => {
        const name =
          username === h.username ? "Me" : h.name ? h.name : h.username;
        const date = h.date.slice(0, 10).replace(/\-/g, "/");

        return (
          <Box variant="div" mb={1} key={index}>
            <Box
              variant="div"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box variant="div" display="flex" alignItems="center" gap={1}>
                <Avatar src={h.avatar} alt={name} />
                <Typography fontSize={14} fontWeight={500} color="text.main">
                  {name}
                </Typography>
              </Box>

              <Box variant="div" display="flex" alignItems="center" gap={1}>
                <Typography fontSize={12} fontWeight={400} color="text.main">
                  {date}
                </Typography>
                <ButtonText
                  color="text.100"
                  sizeIcon={20}
                  Icon={LuTrash2}
                  onClick={() => setOpenModalDelete(h)}
                />
              </Box>
            </Box>
            <Typography
              fontSize={14}
              fontWeight={400}
              color="text.dark"
              p="8px 50px"
            >
              {h.content}
            </Typography>
          </Box>
        );
      }),
    [username, currentDoc]
  );

  return (
    <>
      {currentDoc?.highlights.length > 0 ? (
        <>
          {seeAll ? listHighlights : listHighlights.slice(0, 2)}
          {!seeAll ||
            (listHighlights.length <= 2 && (
              <ButtonText
                title="See All"
                color="primary.main"
                onClick={handleSeeAll}
                sx={{ justifyContent: "flex-end", m: 1 }}
              />
            ))}
        </>
      ) : (
        <Typography
          color="text.200"
          fontWeight={400}
          fontSize={16}
          textAlign="center"
          p={2}
        >
          No highlights to show... yet!
        </Typography>
      )}

      <BasicModal
        open={openModalAddHighlight}
        handleClose={handleCloseAddHighlight}
        title="Highlight"
      >
        <Input
          title="Write your note:"
          value={highlight}
          onChange={onChangeHighlight}
          multiline
          maxRows={6}
        />

        <Btn
          variant="contained"
          fullWidth
          onClick={handleAddHighlight}
          sx={{ mt: 2 }}
          title="Save"
        />
      </BasicModal>

      <ModalDelete
        open={!!openModalDelete}
        handleClose={handleCloseModalDelete}
        handleDelete={() => handleDelete(openModalDelete)}
        title="Do you want to delete this highlight?"
      />
    </>
  );
};

export default HighLights;
