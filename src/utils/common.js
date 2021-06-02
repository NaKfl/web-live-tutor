// Create an array from start to end - 1: range(1, 3) --> [1, 2]
import moment from 'moment';

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
          stt: index + 1,
          studentName: value?.studentInfo?.name,
          startTime: moment(value?.startTime).format('DD/MM/YYYY HH:mm:ss'),
          endTime: moment(value?.endTime).format('DD/MM/YYYY HH:mm:ss'),
        }
      : {
          key: value.id,
          during: value.during,
          stt: index + 1,
          tutorName: value?.tutorInfo?.name,
          startTime: moment(value?.startTime).format('DD/MM/YYYY HH:mm:ss'),
          endTime: moment(value?.endTime).format('DD/MM/YYYY HH:mm:ss'),
        },
  );
};

export const mapBookingListDataSource = data => {
  const result = data.map((item, index) => {
    const { startPeriod, endPeriod, scheduleInfo } = item.scheduleDetailInfo;
    const { date, tutorInfo } = scheduleInfo;
    const { id, name } = tutorInfo;
    return {
      scheduleDetailId: item.scheduleDetailId,
      stt: index + 1,
      userId: item.userId,
      tutorId: id,
      name,
      date,
      startPeriod,
      endPeriod,
    };
  });
  return result;
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
