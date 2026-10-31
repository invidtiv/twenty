import importlib.util
import unittest
from pathlib import Path
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('twenty_kairos', Path(__file__).with_name('twenty_kairos_mcp.py'))
adapter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(adapter)

class PortugalResponseTests(unittest.TestCase):
    def test_tool_replaces_stale_clock_at_response_time(self):
        with patch.object(adapter, '_query', return_value={'ok': True, 'portugal_time': {'current_time': '2000-01-01'}}):
            result = adapter.get_upcoming_events(1)
        self.assertEqual(result['portugal_time']['timezone'], 'Europe/Lisbon')
        self.assertNotEqual(result['portugal_time']['current_time'], '2000-01-01')

    def test_validation_error_has_current_portugal_time_without_network(self):
        with patch.object(adapter, '_mutate') as mutate:
            with self.assertRaisesRegex(RuntimeError, 'Current Portugal time: .*Europe/Lisbon'):
                adapter.mutate_record('createCommunication', {})
        mutate.assert_not_called()

    def test_unavailable_twenty_error_has_current_portugal_time(self):
        with patch.object(adapter, '_request_raw', side_effect=RuntimeError('unavailable')):
            with self.assertRaisesRegex(RuntimeError, 'Europe/Lisbon'):
                adapter._request('/s/kairos/query', {})

if __name__ == '__main__': unittest.main()
