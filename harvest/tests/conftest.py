import pytest


@pytest.fixture(scope="module")
def vcr_config():
    return {
        "decode_compressed_response": True,
        "filter_headers": [
            "Authorization",
        ],
        "record_mode": "once",
    }
