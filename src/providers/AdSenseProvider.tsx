"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAdConfigs, AdConfig } from '@/services/adsenseService';

interface AdSenseContextType {
  adConfigs: AdConfig[];
  getAdConfigBySlot: (slot: string) => AdConfig | undefined;
  isLoading: boolean;
}

const AdSenseContext = createContext<AdSenseContextType | undefined>(undefined);

export const AdSenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adConfigs, setAdConfigs] = useState<AdConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConfigs = async () => {
      const configs = await getAdConfigs();
      setAdConfigs(configs);
      setIsLoading(false);
    };

    fetchConfigs();
  }, []);

  const getAdConfigBySlot = (slot: string) => {
    return adConfigs.find(config => config.slot === slot);
  };

  return (
    <AdSenseContext.Provider value={{ adConfigs, getAdConfigBySlot, isLoading }}>
      {children}
    </AdSenseContext.Provider>
  );
};

export const useAdSense = () => {
  const context = useContext(AdSenseContext);
  if (context === undefined) {
    throw new Error('useAdSense must be used within an AdSenseProvider');
  }
  return context;
};
