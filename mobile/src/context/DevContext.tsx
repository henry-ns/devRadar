import React, { FC, useState, createContext, useEffect } from 'react';

import api from '~/services/api';
import { connect, disconnect, subscribeToNewDevs } from '~/services/socket';

interface Location {
  coordinates: number[];
}

export interface Dev {
  _id: number;
  bio: string;
  name: string;
  techs: string[];
  avatar_url: string;
  github_username: string;
  location: Location;
}

interface SearchParams {
  latitude: number;
  longitude: number;
  techs: string;
}

interface ContextProps {
  devs: Dev[];
  loadDevs(params: SearchParams): void;
}

interface Response {
  devs: Dev[];
}

const DevContext = createContext<ContextProps>({
  devs: [],
  loadDevs: () => {},
});

const DevProvider: FC = ({ children }) => {
  const [devs, setDevs] = useState<Dev[]>([]);

  function setupWebsocket({ latitude, longitude, techs }: SearchParams) {
    disconnect();

    connect(latitude, longitude, techs);
  }

  async function loadDevs(params: SearchParams) {
    console.log('loaddevs');

    const { data } = await api.get<Response>('/search', { params });

    setDevs(data.devs);
    setupWebsocket(params);
  }

  useEffect(() => {
    subscribeToNewDevs((dev: Dev) => setDevs([...devs, dev]))
  }, [devs]);

  return (
    <DevContext.Provider
      value={{
        devs,
        loadDevs,
      }}
    >
      {children}
    </DevContext.Provider>
  );
};

export { DevProvider };
export default DevContext;
