from http.server import BaseHTTPRequestHandler, HTTPServer
from collaborativeFilteringRec import CollaborativeFilter
import json

hostName = "localhost"
serverPort = 9000

class MyServer(BaseHTTPRequestHandler):
    def do_POST(self):
        self.send_response(200)
        self.send_header("Content-type", "text/json")
        self.end_headers()

        content_len = int(self.headers.get('Content-Length'))
        post_body = json.loads(self.rfile.read(content_len))
        ret = json.dumps(CollaborativeFilter(post_body['user'], post_body['games'], post_body['values']).predicted)
        self.wfile.write(bytes(ret, "utf-8"))

if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")