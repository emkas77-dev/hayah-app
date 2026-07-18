/* Generic persistence: loads once from window.storage, then saves on every change. */
function usePersistedState(key, initialValue, onStatus) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(key, true);
        if (res?.value) setValue(JSON.parse(res.value));
      } catch {
        // nothing saved yet — keep the starter mock data
      } finally {
        setLoaded(true);
      }
    })();
  }, [key]);

  useEffect(() => {
    if (!loaded) return; // don't overwrite saved data with the initial mock on first render
    onStatus?.("saving");
    window.storage.set(key, JSON.stringify(value), true)
      .then(() => onStatus?.("saved"))
      .catch((err) => onStatus?.("error", err?.message || "فشل الحفظ"));
  }, [value, loaded]);
import React from 'react'
import ReactDOM from 'react-dom/client'
import OperationsRoom from './OperationsRoom.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <OperationsRoom />
)
