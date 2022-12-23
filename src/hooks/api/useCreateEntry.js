import useAsync from '../useAsync';
import useToken from '../useToken';
import * as activitiesApi from '../../services/activitiesApi.js';

export default function useCreateEntry() {
  const token = useToken();

  const {
    data: entry,
    loading: entryLoading,
    error: entryError,
    act: createEntry
  } = useAsync((data) => activitiesApi.createEntry(data, token));

  return {
    entry,
    entryLoading,
    entryError,
    createEntry
  };
}
