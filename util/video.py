import cv2
from collections import namedtuple


VideoMetadata = namedtuple('VideoMetadata', [
    'fps', 'num_frames', 'width', 'height'
])


def _get_metadata(vc):
    fps = vc.get(cv2.CAP_PROP_FPS)
    width = int(vc.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(vc.get(cv2.CAP_PROP_FRAME_HEIGHT))
    num_frames = int(vc.get(cv2.CAP_PROP_FRAME_COUNT))
    return VideoMetadata(fps, num_frames, width, height)


def get_metadata(video_path):
    vc = cv2.VideoCapture(video_path)
    try:
        return _get_metadata(vc)
    finally:
        vc.release()


def get_frame(video_file, frame_num, height=0):
    vc = cv2.VideoCapture(video_file)
    try:
        vc.set(cv2.CAP_PROP_POS_FRAMES, frame_num)
        _, frame = vc.read()
        if height > 0:
            h, w, _ = frame.shape
            width = int(w * height / h)
            frame = cv2.resize(frame, (width, height))
    finally:
        vc.release()
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    return frame