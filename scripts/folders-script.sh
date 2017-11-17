for i in *.ts;
do
mkdir "${i%.ts}"
mv "$i" "${i%.ts}/$i"
done