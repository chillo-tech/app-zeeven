// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';

import { add, handleError, search } from '@/services';
import { Guest } from '@/types';
import { BACKEND_BASE_PATH } from '@/utils';
import parsePhoneNumber from 'libphonenumber-js';
import { FcGoogle } from 'react-icons/fc';
import { useMutation, useQuery } from 'react-query';

function GoogleGuests({ reset, handleSubmit, showSeparator }: any) {
  const DISCOVERY_DOC = process.env.NEXT_PUBLIC_DISCOVERY_DOC;
  const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const SCOPES = process.env.NEXT_PUBLIC_SCOPES;
  const [count, setCount] = useState(0);
  const [guestList, setGuestList] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [gapiInited, setGapiInited] = useState(false);
  const [gisInited, setGisInited] = useState(false);
  const [tokenClient, setTokenClient] = useState({});

  const mapUser = (entry: any) => {
    const { emailAddresses, names, phoneNumbers } = entry;
    let guest: any = {};
    if (emailAddresses && emailAddresses.length) {
      const firstEmail = emailAddresses[0];
      const { value: email } = firstEmail;
      guest = { ...guest, email };
    }

    if (names && names.length) {
      const name = names[0];
      const { givenName: firstName, familyName: lastName } = name;
      guest = { ...guest, firstName, lastName };
    }

    if (phoneNumbers && phoneNumbers.length) {
      const firstPhone = phoneNumbers[0];
      const { canonicalForm = '' } = firstPhone;
      const { value = '' } = firstPhone;
      const phoneValue = canonicalForm && canonicalForm.trim() ? canonicalForm : value;
      const phoneNumber = parsePhoneNumber(phoneValue, 'FR') || {
        countryCallingCode: '',
        nationalNumber: '',
      };
      const { countryCallingCode: phoneIndex, nationalNumber: phone } = phoneNumber;
      guest = { ...guest, phoneIndex, phone };
    }
    return guest;
  };

  async function listConnectionNames() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.people.people.connections.list({
        resourceName: 'people/me',
        pageSize: 2000,
        personFields: 'names,emailAddresses,phoneNumbers',
      });
    } catch (err) {
      console.log(err);
      return;
    }
    const connections = response.result.connections;
    if (!connections || connections.length == 0) {
      return;
    }
    // Flatten to string to display
    const guests: Guest[] = connections.map((entry: any) => mapUser(entry));
    setGuestList((prev: any) => [...prev, ...guests]);
    setCount(count + 1);
    save(guests);
  }

  async function listOtherConnectionNames() {
    let response;
    try {
      // Fetch first 10 files
      response = await gapi.client.people.otherContacts.list({
        pageSize: 1000,
        readMask: 'names,emailAddresses,phoneNumbers',
      });
    } catch (err) {
      console.log(err);
      return;
    }
    const otherContacts = response.result.otherContacts;
    const guests: Guest[] = otherContacts.map((entry: any) => mapUser(entry));
    setGuestList((prev: any) => [...prev, ...guests]);
    setCount(count + 1);
    save(guests);
  }

  const gmailContacts = () => {
    // setFetch(true);
    if (gapiInited && gisInited) {
      showSeparator(true);
      tokenClient.callback = async (resp: any) => {
        if (resp.error !== undefined) {
          throw resp;
        }
        await listConnectionNames();
        await listOtherConnectionNames();
      };

      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
      }
    }
  };
  const initializeGapiClient = useCallback(async () => {
    // @ts-nocheck
    await gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
    setGapiInited(true);
    showSeparator(true);
  }, [API_KEY, DISCOVERY_DOC, showSeparator]);

  const gapiLoaded = useCallback(() => {
    gapi.load('client', initializeGapiClient);
  }, [initializeGapiClient]);

  const gisLoaded = useCallback(() => {
    const genetatedTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: '', // defined later
    });
    setTokenClient(genetatedTokenClient);
    setGisInited(true);
    showSeparator(true);
  }, [CLIENT_ID, SCOPES, showSeparator]);

  const addMutation = useMutation({
    mutationKey: ['add-guest-list'],
    mutationFn: (guests: Guest[]) => add(`${BACKEND_BASE_PATH}/contact/list`, guests),
    onError: (error: AxiosError) => {
      //setError(error);
      handleError(error);
    },
    onSuccess: () => {
      handleSubmit();
      reset();
    },
  });

  const save = (guests: Guest[]) => {
    addMutation.mutate(guests);
  };

  useEffect(() => {
    gapiLoaded();
    gisLoaded();
  }, [gapiLoaded, gisLoaded]);

  return (
    <>
      {gapiInited && gapiLoaded ? (
        <button
          type="button"
          className="mx-auto flex items-center rounded-md border border-app-blue bg-white px-10 py-2 text-app-blue"
          onClick={gmailContacts}
        >
          <FcGoogle className="mr-3 text-2xl" /> Importer de GMAIL
        </button>
      ) : null}
    </>
  );
}

export default GoogleGuests;
