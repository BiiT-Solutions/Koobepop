#!/bin/bash

# Based on: https://github.com/JFrogDev/project-examples/blob/master/bash-example/deploy-file.sh

localFilePath="$1"
targetFolder="https://artifactory.biit-solutions.com:8443/artifactory/koobepop"
artifactoryUser="jenkins"
artifactoryPassword="Fkx0HKsncprwPvT5EzNU"

if [ ! -f "$localFilePath" ]; then
    echo "ERROR: local file $localFilePath does not exists!"
    exit 1
fi

#check if md5sum and sha1sum are installed
which md5sum || exit $?
which sha1sum || exit $?

md5Value="`md5sum "$localFilePath"`"
md5Value="${md5Value:0:32}"
sha1Value="`sha1sum "$localFilePath"`"
sha1Value="${sha1Value:0:40}"
fileName="`basename "$localFilePath"`"

echo $md5Value $sha1Value $localFilePath

echo "INFO: Uploading $localFilePath to $targetFolder/$fileName"
curl -i -X PUT -u $artifactoryUser:$artifactoryPassword \
 -H "X-Checksum-Md5: $md5Value" \
 -H "X-Checksum-Sha1: $sha1Value" \
 -T "$localFilePath" \
 "$targetFolder/$fileName"
