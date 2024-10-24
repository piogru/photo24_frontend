import { useRef, useState } from "react";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProfilePic, patchProfilePic } from "../api/queries";
import { Button, DialogTitle, Input } from "@headlessui/react";
import { CameraIcon as CameraIconSolid } from "@heroicons/react/24/solid";
import Modal from "../../core/components/Modal";
import Spinner from "../../core/components/Spinner";
import useCurrentUserQuery from "../../core/hooks/useCurrentUserQuery";
import toaster from "../../core/utils/toaster";
import {
  IMAGE_MAX_SIZE,
  IMAGE_MAX_SIZE_MB,
} from "../../core/constants/appConstants";
import { AxiosError } from "axios";
import AxiosErrorResponse from "../../core/types/axiosErrorResponse";
import clsx from "clsx";

const profilePicInputSchema = z
  .object({
    profilePic: z
      .instanceof(FileList)
      .refine((files) => files?.length === 1, "Image is required.")
      .transform((files) => files[0])
      .refine(
        (file) => file.size <= IMAGE_MAX_SIZE,
        `Max file size is ${IMAGE_MAX_SIZE_MB}MB.`,
      )
      .refine(
        (file) => ["image/png", "image/jpeg", "image/jpg"].includes(file.type),
        "Only .jpg, .jpeg, .png files are accepted.",
      ),
  })
  .required();

type TProfilePicInputSchema = z.infer<typeof profilePicInputSchema>;

export default function ProfilePicInput() {
  const queryClient = useQueryClient();
  const { data: currentUser } = useCurrentUserQuery();
  const { handleSubmit, register } = useForm<TProfilePicInputSchema>({
    mode: "onChange",
    resolver: zodResolver(profilePicInputSchema),
  });
  const { ref: profilePicRef, ...profilePicRest } = register("profilePic");
  const inputFile = useRef<HTMLElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const patchMutation = useMutation({
    mutationFn: patchProfilePic,
    onSuccess: () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
      toaster.success({ text: "Profile picture updated." });
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser?.name],
      });
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
        exact: true,
      });
    },
    onError: (error: AxiosError<AxiosErrorResponse>) => {
      toaster.error({
        text:
          error.response?.data ? error.response.data.message : error.message,
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteProfilePic,
    onSuccess: () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
      toaster.success({ text: "Profile picture removed." });
      queryClient.invalidateQueries({
        queryKey: ["users", currentUser?.name],
      });
      queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
        exact: true,
      });
    },
    onError: (error: AxiosError<AxiosErrorResponse>) => {
      toaster.error({
        text:
          error.response?.data ? error.response.data.message : error.message,
      });
    },
  });

  const onSubmit = async (data: TProfilePicInputSchema) => {
    patchMutation.mutate(data);
  };

  const onInvalid: SubmitErrorHandler<TProfilePicInputSchema> = (errors) => {
    if (errors.profilePic) {
      toaster.error({ text: errors.profilePic.message || "File error." });
    }
  };

  const onPictureDelete = () => {
    deleteMutation.mutate();
  };

  const onPictureClick = () => {
    if (currentUser?.profilePic) {
      setMenuOpen(true);
    } else {
      inputFile.current?.click();
    }
  };

  const onMenuClose = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <Modal isOpen={menuOpen} onClose={onMenuClose}>
        <div className="flex w-full flex-col items-center gap-4 sm:w-96">
          <div className="mb-4 mt-6 flex flex-col items-center gap-1 text-center">
            <DialogTitle className="text-xl">
              Change profile picture
            </DialogTitle>
          </div>
          <div className="flex w-full flex-col items-center">
            <Button
              autoFocus
              onClick={() => inputFile.current?.click()}
              className="w-full border-t border-slate-300 py-3 font-semibold text-blue-500
                dark:border-slate-600"
            >
              Upload new photo
            </Button>
            <Button
              autoFocus
              onClick={onPictureDelete}
              className="w-full border-t border-slate-300 py-3 font-semibold text-red-500
                dark:border-slate-600"
            >
              Remove current photo
            </Button>
            <Button
              onClick={onMenuClose}
              className="w-full border-t border-slate-300 py-3 dark:border-slate-600"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <Button
        onClick={onPictureClick}
        className={clsx(
          "absolute left-0 top-0 h-full w-full cursor-pointer overflow-hidden rounded-full",
          currentUser?.profilePic ? "" : "bg-black/40",
        )}
      >
        {currentUser?.profilePic ? null : (
          <CameraIconSolid
            className="absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2
              text-gray-200"
          />
        )}
      </Button>

      {patchMutation.isPending || deleteMutation.isPending ?
        <div className="absolute inset-0 flex h-full w-full flex-row items-center justify-center">
          <Spinner size="xl" />
        </div>
      : null}

      <form onChange={handleSubmit(onSubmit, onInvalid)}>
        <Input
          {...profilePicRest}
          id="profile_pic_input"
          type="file"
          className="hidden"
          ref={(e) => {
            profilePicRef(e);
            inputFile.current = e;
          }}
        />
      </form>
    </>
  );
}
