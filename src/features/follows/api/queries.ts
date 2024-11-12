import api from "../../core/api/api";
import Follow from "../../core/types/follow";
import ObjectId from "../../core/types/objectId";

const getFollowing = async (followerId: ObjectId) => {
  return api
    .get<Follow[]>(`/follows/${followerId}/following`)
    .then((response) => {
      return response.data;
    });
};

const getFollowers = async (targetId: ObjectId) => {
  return api
    .get<Follow[]>(`/follows/${targetId}/followers`)
    .then((response) => {
      return response.data;
    });
};

export { getFollowing, getFollowers };
