all: dist/resampler.js dist/resampler.min.js

EMCONFIGURE:=emconfigure
EMMAKE:=emmake
EMCC:=emcc
RESAMPLER:=resampler_v221
RESAMPLER_URL:=https://imageresampler.googlecode.com/files/$(RESAMPLER).7z

$(RESAMPLER): $(RESAMPLER).7z
	cd $(RESAMPLER) && \
	$(EMCONFIGURE) ./configure && \
	$(EMMAKE) make

dist/resampler.js: $(RESAMPLER) pre.js post.js
	$(EMCC) --pre-js pre.js --post-js post.js -s NO_EXIT_RUNTIME=1 -s EXPORTED_FUNCTIONS="['_resample']" $(wildcard $(RESAMPLER)/*.o) -o $@

dist/resampler.min.js: dist/resampler.js
	closure-compiler $< --language_in ECMASCRIPT5 --js_output_file $@

$(RESAMPLER).7z:
	test -e "$@" || wget $(RESAMPLER_URL) && \
	test -e $(RESAMPLER) || mkdir $(RESAMPLER) && \
	test -e dist || mkdir dist && \
	cd $(RESAMPLER) && \
	7za x ../$(RESAMPLER).7z && \
	cp ../resampler/configure.ac . && \
	cp ../resampler/Makefile.am . && \
	aclocal && \
	autoconf && \
	automake --add-missing --foreign && \
	cp ../resampler/exports.cpp .

clean:
	$(RM) -rf $(RESAMPLER)

distclean:
	$(RM) $(RESAMPLER).7z

.PHONY: clean distclean
	
