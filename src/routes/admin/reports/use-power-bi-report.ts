import { useGetPowerBiAccessTokenQuery } from '@/graphql/getPowerBiAccessToken.generated';
import { useLocalStorageState } from 'ahooks';
import axios from 'axios';
import { useEffect, useState } from 'react';

const REPORT_ID = '20811f9b-3575-42f2-9963-3e8058404ffd';

const GET_REPORT_ENDPOINT = `https://api.powerbi.com/v1.0/myorg/reports/${REPORT_ID}`;

const GENERATE_TOKEN_ENDPOINT =
  'https://api.powerbi.com/v1.0/myorg/GenerateToken';

const generateTokenRequestBody = {
  datasets: [
    {
      id: 'd2df3fcb-bc28-423c-9e0c-6c2f4b633c58',
    },
  ],
  reports: [
    {
      id: REPORT_ID,
    },
  ],
};

export const usePowerBiReport = () => {
  const [reportToken, setReportToken] = useState<string>('');
  const [reportUrl, setReportUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [authData] = useLocalStorageState<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
  }>('authData');

  const { data, loading: tokenLoading } = useGetPowerBiAccessTokenQuery();

  useEffect(() => {
    const fetchFromPbi = async (token: string) => {
      setLoading(true);
      axios
        .post(GENERATE_TOKEN_ENDPOINT, generateTokenRequestBody, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReportToken(response.data.token);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al generar el token:', error);
        });
    };
    const getReport = async (token: string) => {
      axios
        .get(GET_REPORT_ENDPOINT, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setReportUrl(response.data.embedUrl);
        })
        .catch((error) => {
          console.error('Error al generar el token:', error);
        });
    };
    if (data && data.getPowerBiAccessToken) {
      getReport(data.getPowerBiAccessToken);
      fetchFromPbi(data.getPowerBiAccessToken);
    }
  }, [data?.getPowerBiAccessToken]);

  return {
    reportToken,
    reportId: REPORT_ID,
    reportUrl,
    loading: loading || tokenLoading,
    userId: authData?.id,
  };
};
