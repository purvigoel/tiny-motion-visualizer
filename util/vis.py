import cv2
import numpy as np

LEFT_COLOR = (120, 200, 255)
RIGHT_COLOR = (120, 255, 200)
MID_COLOR = (200, 120, 255)
FOOT_CONTACT_COLOR = (0, 0, 255)

LEFT_BONES = [(5, 0), (7, 5), (9, 7), (11, 5), (13, 11), (15, 13)]
RIGHT_BONES = [(6, 0), (8, 6), (10, 8), (12, 6), (14, 12), (16, 14)]
MID_BONES = [(11, 12)]
FACE_LEFT_BONES = [(0, 1), (1, 3)]
FACE_RIGHT_BONES = [(0, 2), (2, 4)]


def render_2d_keyp(keyp_2d, keyp_2d_v2=None):
    M, T, N, D = keyp_2d.shape

    block_dim = 128

    def draw_bone(keyp, t, b1, b2, color, base_y=block_dim):
        b1_int = (
            int((keyp[i, t, b1, 0]) * block_dim + block_dim),
            int((keyp[i, t, b1, 1]) * block_dim + base_y))
        b2_int = (
            int((keyp[i, t, b2, 0]) * block_dim + block_dim),
            int((keyp[i, t, b2, 1]) * block_dim + base_y))
        cv2.line(block, b1_int, b2_int, color, 2)

    for t in range(T):
        blocks = []
        for i in range(M):
            block = np.zeros((
                (2 if keyp_2d_v2 is None else 4) * block_dim,
                2 * block_dim, 3
            ), np.uint8)

            for bones, color in (
                (MID_BONES, MID_COLOR),
                (LEFT_BONES, LEFT_COLOR),
                (RIGHT_BONES, RIGHT_COLOR),
            ):
                for b1, b2 in bones:
                    draw_bone(keyp_2d, t, b1, b2, color)
                    if keyp_2d_v2 is not None:
                        draw_bone(keyp_2d_v2, t, b1, b2, color,
                                  base_y=3 * block_dim)
            blocks.append(block)

        frame = np.hstack(blocks)
        cv2.imshow('frame', frame)
        cv2.waitKey(100)


def draw_box(img, xywh, thickness=10):
    cv2.rectangle(img, (xywh[0], xywh[1]),
                  (xywh[0] + xywh[2], xywh[1] + xywh[3]), (0, 0, 255),
                  thickness)


def draw_2d_keyp(img, keyp, thickness=10):
    for bones, color in (
        (MID_BONES, MID_COLOR),
        (LEFT_BONES, LEFT_COLOR),
        (RIGHT_BONES, RIGHT_COLOR),
        (FACE_LEFT_BONES, LEFT_COLOR),
        (FACE_RIGHT_BONES, RIGHT_COLOR)
    ):
        for b1, b2 in bones:
            b1_int = (int(keyp[b1, 0]), int(keyp[b1, 1]))
            b2_int = (int(keyp[b2, 0]), int(keyp[b2, 1]))
            cv2.line(img, b1_int, b2_int, color, thickness)
