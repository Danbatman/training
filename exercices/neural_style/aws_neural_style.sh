ssh -i ants_aws.pem ubuntu@52.58.82.131

apt-get update
apt-get -y dist-upgrade

apt-get install -y gcc g++ gfortran build-essential git wget linux-image-generic libopenblas-dev python-dev python-pip python-nose python-numpy python-scipy

apt-get install -y liblapack-dev
apt-get install -y libblas-dev


wget http://developer.download.nvidia.com/compute/cuda/repos/ubuntu1404/x86_64/cuda-repo-ubuntu1404_7.5-18_amd64.deb
dpkg -i cuda-repo-ubuntu1404_7.5-18_amd64.deb

apt-get update
apt-get upgrade -y

apt-get install -y opencl-headers build-essential protobuf-compiler \
    libprotoc-dev libboost-all-dev libleveldb-dev hdf5-tools libhdf5-serial-dev \
    libopencv-core-dev  libopencv-highgui-dev libsnappy-dev libsnappy1 \
    libatlas-base-dev cmake libstdc++6-4.8-dbg libgoogle-glog0 libgoogle-glog-dev \
    libgflags-dev liblmdb-dev git python-pip gfortran

apt-get install -y opencl-headers  protobuf-compiler \
    libprotoc-dev libboost-all-dev libleveldb-dev hdf5-tools libhdf5-serial-dev \
    libopencv-core-dev  libopencv-highgui-dev libsnappy-dev libsnappy1 \
    libatlas-base-dev cmake libstdc++6-4.8-dbg libgoogle-glog0 libgoogle-glog-dev \
    libgflags-dev liblmdb-dev git  

apt-get clean

apt-get install -y linux-image-extra-`uname -r` linux-headers-`uname -r` linux-image-`uname -r`

apt-get install -y cuda
apt-get clean

// nvidia-smi
lsmod | grep -i nvidia


cd /usr/local/cuda/samples/1_Utilities/deviceQuery
make
./deviceQuery






# install lua package manager
apt-get install -y luarocks luajit


# install torch 
curl -s https://raw.githubusercontent.com/torch/ezinstall/master/install-all | bash

# protocol buffers - google's data exchange format
apt-get install -y libprotobuf-dev protobuf-compiler

# install caffe - a deep learning framework
luarocks install loadcaffe

# to handle various image formats
luarocks install image

# a neural network library
luarocks install nn

# and finally, get "neural-style" from github repo
git clone https://github.com/jcjohnson/neural-style.git

# (optional for GPU/AWS) install cutorch - a CUDA backend for torch 
# see https://en.wikipedia.org/wiki/CUDA
luarocks install cutorch
luarocks install cunn

cd neural-style

sh models/download_models.sh

# you may need SFTP set up too - I assume you can work that out

# now you can paint FAST!
th neural_style.lua -style_image style.jpg -content_image subject.jpg -print_iter 1