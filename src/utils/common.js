// Create an array from start to end - 1: range(1, 3) --> [1, 2]
import moment from 'moment';
import { orderBy } from 'lodash';
import { DATE_TIME_FORMAT } from './constants';
export const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export const toBase64 = file => {
  if (!file) return null;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

export const checkIsFavorite = (data, id) => {
  return data.findIndex(f => f?.secondInfo?.id === id) !== -1;
};

export const mapHistoryDataSource = (data, isTutor, perPage = 10, total) => {
  return data.map((value, index) =>
    isTutor
      ? {
          key: value.id,
          during: value.during,
          no: index + 1,
          studentName: value?.studentInfo?.name,
          tutorId: value.tutorId,
          studentId: value.studentId,
          sessionId: value.id,
          isReviewed: value.isReviewed,
          isTutorReviewed: value.isTutorReviewed,
          startTime: moment(value?.startTime).format(DATE_TIME_FORMAT),
          endTime: moment(value?.endTime).format(DATE_TIME_FORMAT),
          userId: value.studentId,
        }
      : {
          key: value.id,
          during: value.during,
          no: index + 1,
          tutorId: value.tutorId,
          studentId: value.studentId,
          sessionId: value.id,
          isReviewed: value.isReviewed,
          isTutorReviewed: value.isTutorReviewed,
          tutorName: value?.tutorInfo?.name,
          startTime: moment(value?.startTime).format(DATE_TIME_FORMAT),
          endTime: moment(value?.endTime).format(DATE_TIME_FORMAT),
        },
  );
};

export const mapBookingListDataSource = data => {
  const sortData = orderBy(
    data,
    ['scheduleDetailInfo.scheduleInfo.date', 'scheduleDetailInfo.startPeriod'],
    ['desc', 'desc'],
  );
  if (data.length > 0) {
    const result = sortData.map((item, index) => {
      const { startPeriod, endPeriod, scheduleInfo } = item.scheduleDetailInfo;
      const { date, tutorInfo } = scheduleInfo;
      const { id, name } = tutorInfo;
      let duration = moment.duration(
        moment(`${date} ${startPeriod}`, 'YYYY-MM-DD HH:mm').diff(moment()),
      );
      let hours = duration.asHours();

      return {
        scheduleDetailId: item.scheduleDetailId,
        no: index + 1,
        userId: item.userId,
        tutorId: id,
        name,
        date,
        startPeriod,
        endPeriod,
        canDelete: hours >= 24,
        studentMeetingLink: item.studentMeetingLink,
        canGoToMeeting: hours >= 0,
      };
    });
    return result;
  }
  return [];
};

export const useQuery = useLocation => {
  return new URLSearchParams(useLocation?.search);
};

export const sortObject = o => {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
};

export const majorBykey = (majors, key, lang) => {
  if (lang === 'en') {
    return majors.find(major => major?.key === key)?.englishName;
  } else {
    return majors.find(major => major?.key === key)?.vietnameseName;
  }
};

export const generateUUID = () => {
  var d = new Date().getTime();
  var d2 = (performance && performance.now && performance.now() * 1000) || 0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};
