import { ajax } from 'rxjs/internal/ajax/ajax';
import { catchError, map, mergeMap } from 'rxjs';

export const createAssistant$ = (name, instructions) => {
  return ajax({
    url: `${import.meta.env.VITE_HOSTNAME}/assistants/create`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'airpipe-token': localStorage.getItem('jwt'),
    },
    body: {
      name,
      instructions,
      model: 'gpt-3.5-turbo',
      API_KEY: `${import.meta.env.VITE_OPEN_AI_API_KEY}`,
    },
  }).pipe(
    mergeMap((result) => {
      const response = result.response;
      return ajax({
        url: `${import.meta.env.VITE_HOSTNAME}/assistants/thread/create?api_key=${import.meta.env.VITE_OPEN_AI_API_KEY}&assistant_id=${response.data?.InsertAssistant?.data[0].assistant_id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }),
    catchError((err) => console.error(err)),
  );
};

export const createContent$ = (name, message) => {
  return ajax({
    url: `${import.meta.env.VITE_HOSTNAME}/assistants/message`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'airpipe-token': localStorage.getItem('jwt'),
    },
    body: {
      API_KEY: `${import.meta.env.VITE_OPEN_AI_API_KEY}`,
      name,
      message,
      image: true,
    },
  }).pipe(
    map((res) => {
      const response = res.response;
      const imageURL = response.data?.UploadImage?.data?.image_url;
      const caption = response.data?.ReturnResponse?.data?.value;
      return {
        imageURL,
        caption,
      };
    }),
  );
};

export const post$ = (image_url, caption) => {
  return ajax({
    url: `${import.meta.env.VITE_HOSTNAME}/instagram/post`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'airpipe-token': localStorage.getItem('jwt'),
    },
    body: {
      image_url,
      caption,
      is_carousel_item: false,
      platform_id: import.meta.env.VITE_PAGE_ID,
    },
  });
};
