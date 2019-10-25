# Simple Document Viewer

This is a Simple Document Viewer with Uniconv, pyhwp<br>
Used <b>Express, React</b><br>
All of uploaded file delete every 30 minuites 
## Requirements
[unoconv](http://dag.wiee.rs/home-made/unoconv/) is required, which requires LibreOffice (or OpenOffice.)<br>
[pihwp](https://github.com/mete0r/pyhwp) is required<br>
If you want to use Docker click [Docker-NodeSimpleDocumentViewer](https://github.com/always-awaken/Docker-NodeSimpleDocumentViewer)
## Quick Start

```bash
# If you use Ubuntu or Debian
apt-get install unoconv

apt-get install libreoffice-writer libreoffice-calc

# pip install
pip install lxml
pip install --user --pre pyhwp

#git clone
git clone https://github.com/always-awaken/NodeSimpleDocumentViewer.git document_viewer
cd document_viewer

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```
## Postman

use [PostMan](https://www.getpostman.com/)
import ./simple_document_viewer.postman_collection.json

## Image Sample

![image](./static/uploads/screen_shot_2019-10-24.PNG)

