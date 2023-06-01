import numpy as np


class Pose:
    """
    COCO 17 pose
    """
    Nose = 0
    LEye = 1
    REye = 2
    LEar = 3
    REar = 4
    LShoulder = 5
    RShoulder = 6
    LElbow = 7
    RElbow = 8
    LWrist = 9
    RWrist = 10
    LHip = 11
    RHip = 12
    LKnee = 13
    RKnee = 14
    LAnkle = 15
    RAnkle = 16

    NumKeypoints = 17

    FlipIndices = [
        0,                              # Head
        2, 1, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15,  # Body
    ]


class Bone:
    """
    Fake "bones" for COCO pose
    """
    # No left right orientation
    LShoulder2RShoulder = 0
    LHip2RHip = 1

    # Has left right orientation
    LEye2Nose = 2
    REye2Nose = 3
    LEar2LEye = 4
    REar2REye = 5
    LShoulder2Nose = 6
    RShoulder2Nose = 7
    LElbow2LShoulder = 8
    RElbow2RShoulder = 9
    LWrist2LElbow = 10
    RWrist2RElbow = 11
    LHip2LShoulder = 12
    RHip2RShoulder = 13
    LKnee2LHip = 14
    RKnee2RHip = 15
    LAnkle2LKnee = 16
    RAnkle2RKnee = 17

    NumBones = 18

    KeypointPairs = (
        (Pose.LShoulder, Pose.RShoulder),
        (Pose.LHip, Pose.RHip),
        (Pose.LEye, Pose.Nose),
        (Pose.REye, Pose.Nose),
        (Pose.LEar, Pose.LEye),
        (Pose.REar, Pose.REye),
        (Pose.LShoulder, Pose.Nose),
        (Pose.RShoulder, Pose.Nose),
        (Pose.LElbow, Pose.LShoulder),
        (Pose.RElbow, Pose.RShoulder),
        (Pose.LWrist, Pose.LElbow),
        (Pose.RWrist, Pose.RElbow),
        (Pose.LHip, Pose.LShoulder),
        (Pose.RHip, Pose.RShoulder),
        (Pose.LKnee, Pose.LHip),
        (Pose.RKnee, Pose.RHip),
        (Pose.LAnkle, Pose.LKnee),
        (Pose.RAnkle, Pose.RKnee))


assert len(Bone.KeypointPairs) == Bone.NumBones


class Bone_Symmetric:
    """
    Bones with symmetries removed
    """
    Shoulder2Shoulder = 0
    Hip2Hip = 1
    Eye2Nose = 2
    Ear2Eye = 3
    Shoulder2Nose = 4
    Elbow2Shoulder = 5
    Wrist2Elbow = 6
    Hip2Shoulder = 7
    Knee2Hip = 8
    Ankle2Knee = 9

    NumBones = 10

    @staticmethod
    def expand_stats(arr):
        idxs = [
            Bone_Symmetric.Shoulder2Shoulder,
            Bone_Symmetric.Hip2Hip,
            Bone_Symmetric.Eye2Nose,
            Bone_Symmetric.Eye2Nose,
            Bone_Symmetric.Ear2Eye,
            Bone_Symmetric.Ear2Eye,
            Bone_Symmetric.Shoulder2Nose,
            Bone_Symmetric.Shoulder2Nose,
            Bone_Symmetric.Elbow2Shoulder,
            Bone_Symmetric.Elbow2Shoulder,
            Bone_Symmetric.Wrist2Elbow,
            Bone_Symmetric.Wrist2Elbow,
            Bone_Symmetric.Hip2Shoulder,
            Bone_Symmetric.Hip2Shoulder,
            Bone_Symmetric.Knee2Hip,
            Bone_Symmetric.Knee2Hip,
            Bone_Symmetric.Ankle2Knee,
            Bone_Symmetric.Ankle2Knee,
        ]
        return arr[idxs]