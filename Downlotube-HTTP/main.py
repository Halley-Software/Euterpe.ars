# Utilities Imports
import json
from io import BytesIO
from base64 import b64encode
from typing import TypedDict

from pytube import YouTube, Playlist, helpers

# Server Imports
from flask import Flask, jsonify, request as req
from flask_cors import CORS

app = Flask(__name__)

PROXY_ADDR = "http://192.168.5.254:3128"

proxy_handler = {
    "http": PROXY_ADDR,
    'https': PROXY_ADDR
}

#helpers.install_proxy(proxy_handler)

CORS(app)
# El putisimo Node.js abre el proceso en localhost en lugar de 127.0.0.1
# Y Python no es capaz de hacer el forwarding entre localhost y 127.0.0.1

class JSONBody(TypedDict):
    SOURCE_URL: str
    SAVE: bool

class ExistentMap(TypedDict):
    URL: str

@app.post("/simple")
def simple_download():
    body: JSONBody = json.loads(req.data.decode("UTF-8"))
    blob = ""

    try:
        vid_yt = YouTube(body["SOURCE_URL"])
        vid = vid_yt.streams.get_by_itag(140)
        buffer = BytesIO()

        vid.stream_to_buffer(buffer)
        buffer.seek(0)

        blob = b64encode(buffer.read()).decode("UTF-8")
    except:
        raise Exception("Error occurred")

    return blob

@app.post("/playlist")
def download_playlist():
    body: JSONBody = json.loads(req.data.decode("UTF-8"))

    try:
        vid_yt = Playlist(body["SOURCE_URL"])
        
    except:
        raise Exception("Error occurred")

@app.post("/metadata")
def get_metadata():
    """
    Gets the metadata of the requested source
    """
    vid_yt = YouTube(req.data.decode("UTF-8"))
    return jsonify(
        title = vid_yt.title,
        author = vid_yt.author,
        duration = vid_yt.length
    )

""" if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003, debug=True) """
