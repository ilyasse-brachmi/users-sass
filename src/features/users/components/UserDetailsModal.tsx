"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { User } from "@/types/users";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
};

export default function UserDetailsModal({ open, onClose, user }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="user-details-title"
      aria-describedby="user-details-description"
    >
      <Box sx={{ ...style, width: 420 }}>
        <Typography id="user-details-title" variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }} >
          User details
        </Typography>

        {!user ? (
          <Typography id="user-details-description">No user selected.</Typography>
        ) : (
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, mt: 2 }}>
              <img
                src={user.avatar}
                alt={`${user.first_name} avatar`}
                style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover" }}
              />
              <Box>
                <Typography><strong>{user.first_name} {user.last_name}</strong></Typography>
                <Typography variant="body2">{user.email}</Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button onClick={onClose}>Close</Button>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
