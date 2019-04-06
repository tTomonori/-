electron-packager ./ いれぶんず --platform=darwin --icon=image/icon.icns
rm -r いれぶんず-darwin-x64/いれぶんず.app/Contents/Resources/app/node_modules
cp -r node_modules いれぶんず-darwin-x64/いれぶんず.app/Contents/Resources/app/node_modules
