import { catchError, concatAll, map } from 'rxjs';
import { ajax } from 'rxjs/internal/ajax/ajax';
import {
  checkName,
  currentDayMinusSevenDays,
  fetchToday,
} from '@utility/utils.js';

/**
 *
 * @returns {{
 *   name: '',
 *   avatar: ''
 * }}
 */
const profileFetch$ = (recipient_id, platform_id, organization_uuid) => {
  return ajax({
    url: `${import.meta.env.VITE_HOSTNAME}/organization/profile?organization_uuid=${organization_uuid}&recipient_id=${recipient_id}&platform_id=${platform_id}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'airpipe-token': localStorage.getItem('jwt'),
    },
  }).pipe(
    map((res) => {
      const response = res.response;
      return {
        id: recipient_id,
        name:
          response?.data?.GetFacebookProfile?.data?.body?.name ??
          response?.data?.ProfileData?.data.name,
        avatar:
          response?.data?.GetFacebookProfile?.data?.body?.picture?.data?.url ??
          response?.data?.ProfileData?.data.profile_image_url,
      };
    }),
    catchError((err) => console.error(err)),
  );
};

/**
 *
 * @returns{{
 *     'id': '',
 *     'avatar': '',
 *     'timestamp': '',
 *     'name': '',
 *     'messages': [
 *         {
 *             'id': '',
 *             'avatar': '',
 *             'timestamp': '',
 *             'name': '',
 *             'message': '',
 *             'timestamp': 0,
 *             'uuid': ''
 *         }
 *     ]
 * }}
 */
const initialFetch$ = (pageProfile, organization_uuid) => {
  return ajax({
    url: `${import.meta.env.VITE_HOSTNAME}/messages/latest`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'airpipe-token': localStorage.getItem('jwt'),
    },
    body: {
      organization_uuid,
      platform_id: pageProfile.id,
    },
  }).pipe(
    map((res) => {
      // Mapping incoming response to shadCN data format
      const recentMessages =
        res?.response?.data?.LatestMessagePerRecipient?.data;
      // Will add error handling if the response is undefined
      return recentMessages.map((recentMessage) => {
        // Extracting attributes that will be needed in both
        // Profile and the message POJO
        const recipientData = recentMessage.recipient;
        const messageData = recipientData.latest_message;
        const checkRecipient = recipientData.id === pageProfile.id;
        const obj = {
          id: checkRecipient ? pageProfile.id : recipientData.id,
          avatar: checkRecipient
            ? pageProfile.avatar
            : recipientData.profile_image_url,
          read_timestamp: messageData.read_timestamp,
          // Loosely checking in case of null or undefined
          name: checkName(recipientData.name)
            ? recipientData.id
            : recipientData.name,
        };
        return {
          ...obj,
          page: pageProfile.id,
          messages: [
            {
              ...obj,
              name:
                messageData.sender_id === recipientData.id
                  ? obj.name
                  : pageProfile.name,
              message: messageData.text,
              content:
                messageData.message_type !== 'text'
                  ? messageData?.content[0]?.payload?.url
                  : 'text',
              uuid: messageData.uuid,
            },
          ],
        };
      });
    }),
    catchError((err) => {
      console.error(err);
      // Keeping this as a placeholder in case we need to return an observable response
      // return of({ error: true, message: `Error :- ${err}` });
    }),
    concatAll(),
  );
};

/**
 *
 * @param recipient
 * @param pageProfile
 * @param organization_uuid
 * @param pos
 * @returns{{
 *     'id': '',
 *     'name': '',
 *     'messages': [
 *         {
 *             'id': '',
 *             'name': '',
 *             'message': '',
 *             'timestamp': 0,
 *             'uuid': '',
 *             'bgColor': '',
 *             'textColor': ''
 *         }
 *     ]
 * }}
 */
const fetchMessages$ = (recipient, pageProfile, organization_uuid, pos = 0) => {
  return ajax({
    url: `${import.meta.env.VITE_HOSTNAME}/messages/list`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'airpipe-token': localStorage.getItem('jwt'),
    },
    body: {
      organization_uuid,
      pos,
      start_ts: currentDayMinusSevenDays(),
      end_ts: fetchToday() + 300000,
      recipient_id: recipient.id,
      platform_id: pageProfile.id,
      group_by: 'platform_id',
    },
  }).pipe(
    map((res) => {
      let userMessages = res?.response?.data?.GetMessages?.data;
      if (Object.keys(userMessages || {}).length !== 0) {
        userMessages = userMessages[`${pageProfile.id}`];
        const messages = userMessages.map((message) => {
          const checkRecipient = message.recipient_id === recipient.id;
          return {
            name: checkRecipient ? pageProfile.name : recipient.name,
            message: message.text,
            timestamp: message.timestamp,
            uuid: message.mid,
            content:
              message.message_type !== 'text'
                ? message?.content[0]?.payload?.url
                : 'text',
          };
        });
        return {
          id: recipient.id,
          name: recipient.name,
          avatar: recipient.avatar,
          page: pageProfile.id,
          messages,
        };
      }
    }),
    catchError((err) => console.error(err)),
  );
};

/**
 *
 * @param message
 * @param organization_uuid
 * @returns {Observable<AjaxResponse>}
 */
const sendMessage$ = (message, organization_uuid, pageProfile) => {
  return ajax({
    url: `${import.meta.env.VITE_HOSTNAME}/facebook/message`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'airpipe-token': localStorage.getItem('jwt'),
    },
    body: {
      platform_id: pageProfile.id,
      organization_uuid,
      recipient_id: message.recipient_id,
      text: message.message,
    },
  }).pipe(catchError((err) => console.error(err)));
};

export { profileFetch$, sendMessage$, initialFetch$, fetchMessages$ };
