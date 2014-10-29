return {
    resampleCanvas: function(srcCanvas, dstCanvas, resampleMethod) {
        var srcWidth = srcCanvas.width;
        var srcHeight = srcCanvas.height;
        var dstWidth = dstCanvas.width;
        var dstHeight = dstCanvas.height;

        var srcContext = srcCanvas.getContext("2d");
        var dstContext = dstCanvas.getContext("2d");

        var srcData = srcContext.getImageData(0, 0, srcWidth, srcHeight);
        var srcArray = srcData.data;
        var channels = 4;

        var srcBuf = Module._malloc(srcArray.length);
        var srcHeap = new Uint8Array(Module.HEAPU8.buffer, srcBuf, srcArray.length);
        srcHeap.set(srcArray);
        var dstLength = dstWidth*dstHeight*channels;
        var dstBuf = Module._malloc(dstLength);
        var result = Module.ccall('resample','number', ['string', 'number', 'number', 'number', 'number', 'number', 'number', 'number'], [resampleMethod, srcBuf, srcWidth, srcHeight, channels, dstBuf, dstWidth, dstHeight]);
        
        var dstArray = new Uint8Array(Module.HEAPU8.buffer, dstBuf, dstLength);

        var imgData = dstContext.createImageData(dstWidth, dstHeight);
        var dstData = imgData.data;
        for (var i = 0; i < dstArray.length; i += 4) {
            dstData[i] = dstArray[i];
            dstData[i+1] = dstArray[i+1];
            dstData[i+2] = dstArray[i+2];
            dstData[i+3] = dstArray[i+3];
        }
        dstContext.putImageData(imgData, 0, 0);
        Module._free(srcBuf);
        Module._free(dstBuf);
    }
};

})();

self.Resampler = Resampler;


