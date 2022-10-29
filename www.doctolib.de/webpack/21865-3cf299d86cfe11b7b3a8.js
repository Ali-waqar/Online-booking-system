/*! For license information please see 21865-3cf299d86cfe11b7b3a8.js.LICENSE.txt */
(self.webpackChunkdoctolib = self.webpackChunkdoctolib || []).push([
    [21865], {
        47016: (e, t, i) => {
            "use strict";
            var r = i(348764).Buffer;

            function n(e) {
                return 0 === e.indexOf("/") && (e = e.substring("/".length)), 0 === e.indexOf("/") && (e = e.substring(1)), e
            }
            var a = new(function() {
                function e() {
                    this.fileData = {}
                }
                var t = e.prototype;
                return t.readFileSync = function(e, t) {
                    void 0 === t && (t = {});
                    var i = "string" === typeof t ? t : t.encoding,
                        a = n(e),
                        o = this.fileData[a];
                    if (null == o) throw new Error("File '" + a + "' not found in virtual file system");
                    return i ? "string" === typeof o ? o : o.toString(i) : r.from(o, "string" === typeof o ? "base64" : void 0)
                }, t.writeFileSync = function(e, t) {
                    this.fileData[n(e)] = t
                }, t.bindFileData = function(e, t) {
                    void 0 === e && (e = {}), void 0 === t && (t = {}), t.reset ? this.fileData = e : Object.assign(this.fileData, e)
                }, e
            }());
            e.exports = a
        },
        640001: (module, __unused_webpack_exports, __webpack_require__) => {
            "use strict";
            var Buffer = __webpack_require__(348764).Buffer;
            const Token = __webpack_require__(583416),
                strtok3 = __webpack_require__(835849),
                {
                    stringToBytes: stringToBytes,
                    tarHeaderChecksumMatches: tarHeaderChecksumMatches,
                    uint32SyncSafeToken: uint32SyncSafeToken
                } = __webpack_require__(476188),
                supported = __webpack_require__(49898),
                minimumBytes = 4100;
            async function fromStream(e) {
                const t = await strtok3.fromStream(e);
                try {
                    return await fromTokenizer(t)
                } finally {
                    await t.close()
                }
            }
            async function fromBuffer(e) {
                if (!(e instanceof Uint8Array || e instanceof ArrayBuffer || Buffer.isBuffer(e))) throw new TypeError(`Expected the \`input\` argument to be of type \`Uint8Array\` or \`Buffer\` or \`ArrayBuffer\`, got \`${typeof e}\``);
                const t = e instanceof Buffer ? e : Buffer.from(e);
                if (!(t && t.length > 1)) return;
                return fromTokenizer(strtok3.fromBuffer(t))
            }

            function _check(e, t, i) {
                i = {
                    offset: 0,
                    ...i
                };
                for (const [r, n] of t.entries())
                    if (i.mask) {
                        if (n !== (i.mask[r] & e[r + i.offset])) return !1
                    } else if (n !== e[r + i.offset]) return !1;
                return !0
            }
            async function fromTokenizer(e) {
                try {
                    return _fromTokenizer(e)
                } catch (e) {
                    if (!(e instanceof strtok3.EndOfStreamError)) throw e
                }
            }
            async function _fromTokenizer(e) {
                let t = Buffer.alloc(minimumBytes);
                const i = (e, i) => _check(t, e, i),
                    r = (e, t) => i(stringToBytes(e), t);
                if (e.fileInfo.size || (e.fileInfo.size = Number.MAX_SAFE_INTEGER), await e.peekBuffer(t, {
                        length: 12,
                        mayBeLess: !0
                    }), i([66, 77])) return {
                    ext: "bmp",
                    mime: "image/bmp"
                };
                if (i([11, 119])) return {
                    ext: "ac3",
                    mime: "audio/vnd.dolby.dd-raw"
                };
                if (i([120, 1])) return {
                    ext: "dmg",
                    mime: "application/x-apple-diskimage"
                };
                if (i([77, 90])) return {
                    ext: "exe",
                    mime: "application/x-msdownload"
                };
                if (i([37, 33])) return await e.peekBuffer(t, {
                    length: 24,
                    mayBeLess: !0
                }), r("PS-Adobe-", {
                    offset: 2
                }) && r(" EPSF-", {
                    offset: 14
                }) ? {
                    ext: "eps",
                    mime: "application/eps"
                } : {
                    ext: "ps",
                    mime: "application/postscript"
                };
                if (i([31, 160]) || i([31, 157])) return {
                    ext: "Z",
                    mime: "application/x-compress"
                };
                if (i([255, 216, 255])) return {
                    ext: "jpg",
                    mime: "image/jpeg"
                };
                if (i([73, 73, 188])) return {
                    ext: "jxr",
                    mime: "image/vnd.ms-photo"
                };
                if (i([31, 139, 8])) return {
                    ext: "gz",
                    mime: "application/gzip"
                };
                if (i([66, 90, 104])) return {
                    ext: "bz2",
                    mime: "application/x-bzip2"
                };
                if (r("ID3")) {
                    await e.ignore(6);
                    const n = await e.readToken(uint32SyncSafeToken);
                    return e.position + n > e.fileInfo.size ? {
                        ext: "mp3",
                        mime: "audio/mpeg"
                    } : (await e.ignore(n), fromTokenizer(e))
                }
                if (r("MP+")) return {
                    ext: "mpc",
                    mime: "audio/x-musepack"
                };
                if ((67 === t[0] || 70 === t[0]) && i([87, 83], {
                        offset: 1
                    })) return {
                    ext: "swf",
                    mime: "application/x-shockwave-flash"
                };
                if (i([71, 73, 70])) return {
                    ext: "gif",
                    mime: "image/gif"
                };
                if (r("FLIF")) return {
                    ext: "flif",
                    mime: "image/flif"
                };
                if (r("8BPS")) return {
                    ext: "psd",
                    mime: "image/vnd.adobe.photoshop"
                };
                if (r("WEBP", {
                        offset: 8
                    })) return {
                    ext: "webp",
                    mime: "image/webp"
                };
                if (r("MPCK")) return {
                    ext: "mpc",
                    mime: "audio/x-musepack"
                };
                if (r("FORM")) return {
                    ext: "aif",
                    mime: "audio/aiff"
                };
                if (r("icns", {
                        offset: 0
                    })) return {
                    ext: "icns",
                    mime: "image/icns"
                };
                if (i([80, 75, 3, 4])) {
                    try {
                        for (; e.position + 30 < e.fileInfo.size;) {
                            await e.readBuffer(t, {
                                length: 30
                            });
                            const a = {
                                compressedSize: t.readUInt32LE(18),
                                uncompressedSize: t.readUInt32LE(22),
                                filenameLength: t.readUInt16LE(26),
                                extraFieldLength: t.readUInt16LE(28)
                            };
                            if (a.filename = await e.readToken(new Token.StringType(a.filenameLength, "utf-8")), await e.ignore(a.extraFieldLength), "META-INF/mozilla.rsa" === a.filename) return {
                                ext: "xpi",
                                mime: "application/x-xpinstall"
                            };
                            if (a.filename.endsWith(".rels") || a.filename.endsWith(".xml")) {
                                switch (a.filename.split("/")[0]) {
                                    case "_rels":
                                    default:
                                        break;
                                    case "word":
                                        return {
                                            ext: "docx",
                                            mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        };
                                    case "ppt":
                                        return {
                                            ext: "pptx",
                                            mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
                                        };
                                    case "xl":
                                        return {
                                            ext: "xlsx",
                                            mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                        }
                                }
                            }
                            if (a.filename.startsWith("xl/")) return {
                                ext: "xlsx",
                                mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            };
                            if (a.filename.startsWith("3D/") && a.filename.endsWith(".model")) return {
                                ext: "3mf",
                                mime: "model/3mf"
                            };
                            if ("mimetype" === a.filename && a.compressedSize === a.uncompressedSize) {
                                switch (await e.readToken(new Token.StringType(a.compressedSize, "utf-8"))) {
                                    case "application/epub+zip":
                                        return {
                                            ext: "epub",
                                            mime: "application/epub+zip"
                                        };
                                    case "application/vnd.oasis.opendocument.text":
                                        return {
                                            ext: "odt",
                                            mime: "application/vnd.oasis.opendocument.text"
                                        };
                                    case "application/vnd.oasis.opendocument.spreadsheet":
                                        return {
                                            ext: "ods",
                                            mime: "application/vnd.oasis.opendocument.spreadsheet"
                                        };
                                    case "application/vnd.oasis.opendocument.presentation":
                                        return {
                                            ext: "odp",
                                            mime: "application/vnd.oasis.opendocument.presentation"
                                        }
                                }
                            }
                            if (0 === a.compressedSize) {
                                let o = -1;
                                for (; o < 0 && e.position < e.fileInfo.size;) await e.peekBuffer(t, {
                                    mayBeLess: !0
                                }), o = t.indexOf("504B0304", 0, "hex"), await e.ignore(o >= 0 ? o : t.length)
                            } else await e.ignore(a.compressedSize)
                        }
                    } catch (s) {
                        if (!(s instanceof strtok3.EndOfStreamError)) throw s
                    }
                    return {
                        ext: "zip",
                        mime: "application/zip"
                    }
                }
                if (r("OggS")) {
                    await e.ignore(28);
                    const f = Buffer.alloc(8);
                    return await e.readBuffer(f), _check(f, [79, 112, 117, 115, 72, 101, 97, 100]) ? {
                        ext: "opus",
                        mime: "audio/opus"
                    } : _check(f, [128, 116, 104, 101, 111, 114, 97]) ? {
                        ext: "ogv",
                        mime: "video/ogg"
                    } : _check(f, [1, 118, 105, 100, 101, 111, 0]) ? {
                        ext: "ogm",
                        mime: "video/ogg"
                    } : _check(f, [127, 70, 76, 65, 67]) ? {
                        ext: "oga",
                        mime: "audio/ogg"
                    } : _check(f, [83, 112, 101, 101, 120, 32, 32]) ? {
                        ext: "spx",
                        mime: "audio/ogg"
                    } : _check(f, [1, 118, 111, 114, 98, 105, 115]) ? {
                        ext: "ogg",
                        mime: "audio/ogg"
                    } : {
                        ext: "ogx",
                        mime: "application/ogg"
                    }
                }
                if (i([80, 75]) && (3 === t[2] || 5 === t[2] || 7 === t[2]) && (4 === t[3] || 6 === t[3] || 8 === t[3])) return {
                    ext: "zip",
                    mime: "application/zip"
                };
                if (r("ftyp", {
                        offset: 4
                    }) && 0 !== (96 & t[8])) {
                    const m = t.toString("binary", 8, 12).replace("\0", " ").trim();
                    switch (m) {
                        case "avif":
                            return {
                                ext: "avif",
                                mime: "image/avif"
                            };
                        case "mif1":
                            return {
                                ext: "heic",
                                mime: "image/heif"
                            };
                        case "msf1":
                            return {
                                ext: "heic",
                                mime: "image/heif-sequence"
                            };
                        case "heic":
                        case "heix":
                            return {
                                ext: "heic",
                                mime: "image/heic"
                            };
                        case "hevc":
                        case "hevx":
                            return {
                                ext: "heic",
                                mime: "image/heic-sequence"
                            };
                        case "qt":
                            return {
                                ext: "mov",
                                mime: "video/quicktime"
                            };
                        case "M4V":
                        case "M4VH":
                        case "M4VP":
                            return {
                                ext: "m4v",
                                mime: "video/x-m4v"
                            };
                        case "M4P":
                            return {
                                ext: "m4p",
                                mime: "video/mp4"
                            };
                        case "M4B":
                            return {
                                ext: "m4b",
                                mime: "audio/mp4"
                            };
                        case "M4A":
                            return {
                                ext: "m4a",
                                mime: "audio/x-m4a"
                            };
                        case "F4V":
                            return {
                                ext: "f4v",
                                mime: "video/mp4"
                            };
                        case "F4P":
                            return {
                                ext: "f4p",
                                mime: "video/mp4"
                            };
                        case "F4A":
                            return {
                                ext: "f4a",
                                mime: "audio/mp4"
                            };
                        case "F4B":
                            return {
                                ext: "f4b",
                                mime: "audio/mp4"
                            };
                        case "crx":
                            return {
                                ext: "cr3",
                                mime: "image/x-canon-cr3"
                            };
                        default:
                            return m.startsWith("3g") ? m.startsWith("3g2") ? {
                                ext: "3g2",
                                mime: "video/3gpp2"
                            } : {
                                ext: "3gp",
                                mime: "video/3gpp"
                            } : {
                                ext: "mp4",
                                mime: "video/mp4"
                            }
                    }
                }
                if (r("MThd")) return {
                    ext: "mid",
                    mime: "audio/midi"
                };
                if (r("wOFF") && (i([0, 1, 0, 0], {
                        offset: 4
                    }) || r("OTTO", {
                        offset: 4
                    }))) return {
                    ext: "woff",
                    mime: "font/woff"
                };
                if (r("wOF2") && (i([0, 1, 0, 0], {
                        offset: 4
                    }) || r("OTTO", {
                        offset: 4
                    }))) return {
                    ext: "woff2",
                    mime: "font/woff2"
                };
                if (i([212, 195, 178, 161]) || i([161, 178, 195, 212])) return {
                    ext: "pcap",
                    mime: "application/vnd.tcpdump.pcap"
                };
                if (r("DSD ")) return {
                    ext: "dsf",
                    mime: "audio/x-dsf"
                };
                if (r("LZIP")) return {
                    ext: "lz",
                    mime: "application/x-lzip"
                };
                if (r("fLaC")) return {
                    ext: "flac",
                    mime: "audio/x-flac"
                };
                if (i([66, 80, 71, 251])) return {
                    ext: "bpg",
                    mime: "image/bpg"
                };
                if (r("wvpk")) return {
                    ext: "wv",
                    mime: "audio/wavpack"
                };
                if (r("%PDF")) {
                    await e.ignore(1350);
                    const p = 10485760,
                        c = Buffer.alloc(Math.min(p, e.fileInfo.size));
                    return await e.readBuffer(c, {
                        mayBeLess: !0
                    }), c.includes(Buffer.from("AIPrivateData")) ? {
                        ext: "ai",
                        mime: "application/postscript"
                    } : {
                        ext: "pdf",
                        mime: "application/pdf"
                    }
                }
                if (i([0, 97, 115, 109])) return {
                    ext: "wasm",
                    mime: "application/wasm"
                };
                if (i([73, 73, 42, 0])) return r("CR", {
                    offset: 8
                }) ? {
                    ext: "cr2",
                    mime: "image/x-canon-cr2"
                } : i([28, 0, 254, 0], {
                    offset: 8
                }) || i([31, 0, 11, 0], {
                    offset: 8
                }) ? {
                    ext: "nef",
                    mime: "image/x-nikon-nef"
                } : i([8, 0, 0, 0], {
                    offset: 4
                }) && (i([45, 0, 254, 0], {
                    offset: 8
                }) || i([39, 0, 254, 0], {
                    offset: 8
                })) ? {
                    ext: "dng",
                    mime: "image/x-adobe-dng"
                } : (t = Buffer.alloc(24), await e.peekBuffer(t), (i([16, 251, 134, 1], {
                    offset: 4
                }) || i([8, 0, 0, 0], {
                    offset: 4
                })) && i([0, 254, 0, 4, 0, 1, 0, 0, 0, 1, 0, 0, 0, 3, 1], {
                    offset: 9
                }) ? {
                    ext: "arw",
                    mime: "image/x-sony-arw"
                } : {
                    ext: "tif",
                    mime: "image/tiff"
                });
                if (i([77, 77, 0, 42])) return {
                    ext: "tif",
                    mime: "image/tiff"
                };
                if (r("MAC ")) return {
                    ext: "ape",
                    mime: "audio/ape"
                };
                if (i([26, 69, 223, 163])) {
                    async function u() {
                        const t = await e.peekNumber(Token.UINT8);
                        let i = 128,
                            r = 0;
                        for (; 0 === (t & i);) ++r, i >>= 1;
                        const n = Buffer.alloc(r + 1);
                        return await e.readBuffer(n), n
                    }
                    async function l() {
                        const e = await u(),
                            t = await u();
                        t[0] ^= 128 >> t.length - 1;
                        const i = Math.min(6, t.length);
                        return {
                            id: e.readUIntBE(0, e.length),
                            len: t.readUIntBE(t.length - i, i)
                        }
                    }
                    async function d(t, i) {
                        for (; i > 0;) {
                            const t = await l();
                            if (17026 === t.id) return e.readToken(new Token.StringType(t.len, "utf-8"));
                            await e.ignore(t.len), --i
                        }
                    }
                    const g = await l();
                    switch (await d(0, g.len)) {
                        case "webm":
                            return {
                                ext: "webm",
                                mime: "video/webm"
                            };
                        case "matroska":
                            return {
                                ext: "mkv",
                                mime: "video/x-matroska"
                            };
                        default:
                            return
                    }
                }
                if (i([82, 73, 70, 70])) {
                    if (i([65, 86, 73], {
                            offset: 8
                        })) return {
                        ext: "avi",
                        mime: "video/vnd.avi"
                    };
                    if (i([87, 65, 86, 69], {
                            offset: 8
                        })) return {
                        ext: "wav",
                        mime: "audio/vnd.wave"
                    };
                    if (i([81, 76, 67, 77], {
                            offset: 8
                        })) return {
                        ext: "qcp",
                        mime: "audio/qcelp"
                    }
                }
                if (r("SQLi")) return {
                    ext: "sqlite",
                    mime: "application/x-sqlite3"
                };
                if (i([78, 69, 83, 26])) return {
                    ext: "nes",
                    mime: "application/x-nintendo-nes-rom"
                };
                if (r("Cr24")) return {
                    ext: "crx",
                    mime: "application/x-google-chrome-extension"
                };
                if (r("MSCF") || r("ISc(")) return {
                    ext: "cab",
                    mime: "application/vnd.ms-cab-compressed"
                };
                if (i([237, 171, 238, 219])) return {
                    ext: "rpm",
                    mime: "application/x-rpm"
                };
                if (i([197, 208, 211, 198])) return {
                    ext: "eps",
                    mime: "application/eps"
                };
                if (i([40, 181, 47, 253])) return {
                    ext: "zst",
                    mime: "application/zstd"
                };
                if (i([79, 84, 84, 79, 0])) return {
                    ext: "otf",
                    mime: "font/otf"
                };
                if (r("#!AMR")) return {
                    ext: "amr",
                    mime: "audio/amr"
                };
                if (r("{\\rtf")) return {
                    ext: "rtf",
                    mime: "application/rtf"
                };
                if (i([70, 76, 86, 1])) return {
                    ext: "flv",
                    mime: "video/x-flv"
                };
                if (r("IMPM")) return {
                    ext: "it",
                    mime: "audio/x-it"
                };
                if (r("-lh0-", {
                        offset: 2
                    }) || r("-lh1-", {
                        offset: 2
                    }) || r("-lh2-", {
                        offset: 2
                    }) || r("-lh3-", {
                        offset: 2
                    }) || r("-lh4-", {
                        offset: 2
                    }) || r("-lh5-", {
                        offset: 2
                    }) || r("-lh6-", {
                        offset: 2
                    }) || r("-lh7-", {
                        offset: 2
                    }) || r("-lzs-", {
                        offset: 2
                    }) || r("-lz4-", {
                        offset: 2
                    }) || r("-lz5-", {
                        offset: 2
                    }) || r("-lhd-", {
                        offset: 2
                    })) return {
                    ext: "lzh",
                    mime: "application/x-lzh-compressed"
                };
                if (i([0, 0, 1, 186])) {
                    if (i([33], {
                            offset: 4,
                            mask: [241]
                        })) return {
                        ext: "mpg",
                        mime: "video/MP1S"
                    };
                    if (i([68], {
                            offset: 4,
                            mask: [196]
                        })) return {
                        ext: "mpg",
                        mime: "video/MP2P"
                    }
                }
                if (r("ITSF")) return {
                    ext: "chm",
                    mime: "application/vnd.ms-htmlhelp"
                };
                if (i([253, 55, 122, 88, 90, 0])) return {
                    ext: "xz",
                    mime: "application/x-xz"
                };
                if (r("<?xml ")) return {
                    ext: "xml",
                    mime: "application/xml"
                };
                if (i([55, 122, 188, 175, 39, 28])) return {
                    ext: "7z",
                    mime: "application/x-7z-compressed"
                };
                if (i([82, 97, 114, 33, 26, 7]) && (0 === t[6] || 1 === t[6])) return {
                    ext: "rar",
                    mime: "application/x-rar-compressed"
                };
                if (r("solid ")) return {
                    ext: "stl",
                    mime: "model/stl"
                };
                if (r("BLENDER")) return {
                    ext: "blend",
                    mime: "application/x-blender"
                };
                if (r("!<arch>")) {
                    await e.ignore(8);
                    return "debian-binary" === await e.readToken(new Token.StringType(13, "ascii")) ? {
                        ext: "deb",
                        mime: "application/x-deb"
                    } : {
                        ext: "ar",
                        mime: "application/x-unix-archive"
                    }
                }
                if (i([137, 80, 78, 71, 13, 10, 26, 10])) {
                    async function x() {
                        return {
                            length: await e.readToken(Token.INT32_BE),
                            type: await e.readToken(new Token.StringType(4, "binary"))
                        }
                    }
                    await e.ignore(8);
                    do {
                        const h = await x();
                        if (h.length < 0) return;
                        switch (h.type) {
                            case "IDAT":
                                return {
                                    ext: "png",
                                    mime: "image/png"
                                };
                            case "acTL":
                                return {
                                    ext: "apng",
                                    mime: "image/apng"
                                };
                            default:
                                await e.ignore(h.length + 4)
                        }
                    } while (e.position + 8 < e.fileInfo.size);
                    return {
                        ext: "png",
                        mime: "image/png"
                    }
                }
                if (i([65, 82, 82, 79, 87, 49, 0, 0])) return {
                    ext: "arrow",
                    mime: "application/x-apache-arrow"
                };
                if (i([103, 108, 84, 70, 2, 0, 0, 0])) return {
                    ext: "glb",
                    mime: "model/gltf-binary"
                };
                if (i([102, 114, 101, 101], {
                        offset: 4
                    }) || i([109, 100, 97, 116], {
                        offset: 4
                    }) || i([109, 111, 111, 118], {
                        offset: 4
                    }) || i([119, 105, 100, 101], {
                        offset: 4
                    })) return {
                    ext: "mov",
                    mime: "video/quicktime"
                };
                if (i([73, 73, 82, 79, 8, 0, 0, 0, 24])) return {
                    ext: "orf",
                    mime: "image/x-olympus-orf"
                };
                if (r("gimp xcf ")) return {
                    ext: "xcf",
                    mime: "image/x-xcf"
                };
                if (i([73, 73, 85, 0, 24, 0, 0, 0, 136, 231, 116, 216])) return {
                    ext: "rw2",
                    mime: "image/x-panasonic-rw2"
                };
                if (i([48, 38, 178, 117, 142, 102, 207, 17, 166, 217])) {
                    async function w() {
                        const t = Buffer.alloc(16);
                        return await e.readBuffer(t), {
                            id: t,
                            size: Number(await e.readToken(Token.UINT64_LE))
                        }
                    }
                    for (await e.ignore(30); e.position + 24 < e.fileInfo.size;) {
                        const v = await w();
                        let y = v.size - 24;
                        if (_check(v.id, [145, 7, 220, 183, 183, 169, 207, 17, 142, 230, 0, 192, 12, 32, 83, 101])) {
                            const b = Buffer.alloc(16);
                            if (y -= await e.readBuffer(b), _check(b, [64, 158, 105, 248, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) return {
                                ext: "asf",
                                mime: "audio/x-ms-asf"
                            };
                            if (_check(b, [192, 239, 25, 188, 77, 91, 207, 17, 168, 253, 0, 128, 95, 92, 68, 43])) return {
                                ext: "asf",
                                mime: "video/x-ms-asf"
                            };
                            break
                        }
                        await e.ignore(y)
                    }
                    return {
                        ext: "asf",
                        mime: "application/vnd.ms-asf"
                    }
                }
                if (i([171, 75, 84, 88, 32, 49, 49, 187, 13, 10, 26, 10])) return {
                    ext: "ktx",
                    mime: "image/ktx"
                };
                if ((i([126, 16, 4]) || i([126, 24, 4])) && i([48, 77, 73, 69], {
                        offset: 4
                    })) return {
                    ext: "mie",
                    mime: "application/x-mie"
                };
                if (i([39, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], {
                        offset: 2
                    })) return {
                    ext: "shp",
                    mime: "application/x-esri-shape"
                };
                if (i([0, 0, 0, 12, 106, 80, 32, 32, 13, 10, 135, 10])) {
                    await e.ignore(20);
                    switch (await e.readToken(new Token.StringType(4, "ascii"))) {
                        case "jp2 ":
                            return {
                                ext: "jp2",
                                mime: "image/jp2"
                            };
                        case "jpx ":
                            return {
                                ext: "jpx",
                                mime: "image/jpx"
                            };
                        case "jpm ":
                            return {
                                ext: "jpm",
                                mime: "image/jpm"
                            };
                        case "mjp2":
                            return {
                                ext: "mj2",
                                mime: "image/mj2"
                            };
                        default:
                            return
                    }
                }
                if (i([255, 10]) || i([0, 0, 0, 12, 74, 88, 76, 32, 13, 10, 135, 10])) return {
                    ext: "jxl",
                    mime: "image/jxl"
                };
                if (i([0, 0, 1, 186]) || i([0, 0, 1, 179])) return {
                    ext: "mpg",
                    mime: "video/mpeg"
                };
                if (i([0, 1, 0, 0, 0])) return {
                    ext: "ttf",
                    mime: "font/ttf"
                };
                if (i([0, 0, 1, 0])) return {
                    ext: "ico",
                    mime: "image/x-icon"
                };
                if (i([0, 0, 2, 0])) return {
                    ext: "cur",
                    mime: "image/x-icon"
                };
                if (i([208, 207, 17, 224, 161, 177, 26, 225])) return {
                    ext: "cfb",
                    mime: "application/x-cfb"
                };
                if (await e.peekBuffer(t, {
                        length: Math.min(256, e.fileInfo.size),
                        mayBeLess: !0
                    }), r("BEGIN:")) {
                    if (r("VCARD", {
                            offset: 6
                        })) return {
                        ext: "vcf",
                        mime: "text/vcard"
                    };
                    if (r("VCALENDAR", {
                            offset: 6
                        })) return {
                        ext: "ics",
                        mime: "text/calendar"
                    }
                }
                if (r("FUJIFILMCCD-RAW")) return {
                    ext: "raf",
                    mime: "image/x-fujifilm-raf"
                };
                if (r("Extended Module:")) return {
                    ext: "xm",
                    mime: "audio/x-xm"
                };
                if (r("Creative Voice File")) return {
                    ext: "voc",
                    mime: "audio/x-voc"
                };
                if (i([4, 0, 0, 0]) && t.length >= 16) {
                    const k = t.readUInt32LE(12);
                    if (k > 12 && t.length >= k + 16) try {
                        const E = t.slice(16, k + 16).toString();
                        if (JSON.parse(E).files) return {
                            ext: "asar",
                            mime: "application/x-asar"
                        }
                    } catch (B) {}
                }
                if (i([6, 14, 43, 52, 2, 5, 1, 1, 13, 1, 2, 1, 1, 2])) return {
                    ext: "mxf",
                    mime: "application/mxf"
                };
                if (r("SCRM", {
                        offset: 44
                    })) return {
                    ext: "s3m",
                    mime: "audio/x-s3m"
                };
                if (i([71], {
                        offset: 4
                    }) && (i([71], {
                        offset: 192
                    }) || i([71], {
                        offset: 196
                    }))) return {
                    ext: "mts",
                    mime: "video/mp2t"
                };
                if (i([66, 79, 79, 75, 77, 79, 66, 73], {
                        offset: 60
                    })) return {
                    ext: "mobi",
                    mime: "application/x-mobipocket-ebook"
                };
                if (i([68, 73, 67, 77], {
                        offset: 128
                    })) return {
                    ext: "dcm",
                    mime: "application/dicom"
                };
                if (i([76, 0, 0, 0, 1, 20, 2, 0, 0, 0, 0, 0, 192, 0, 0, 0, 0, 0, 0, 70])) return {
                    ext: "lnk",
                    mime: "application/x.ms.shortcut"
                };
                if (i([98, 111, 111, 107, 0, 0, 0, 0, 109, 97, 114, 107, 0, 0, 0, 0])) return {
                    ext: "alias",
                    mime: "application/x.apple.alias"
                };
                if (i([76, 80], {
                        offset: 34
                    }) && (i([0, 0, 1], {
                        offset: 8
                    }) || i([1, 0, 2], {
                        offset: 8
                    }) || i([2, 0, 2], {
                        offset: 8
                    }))) return {
                    ext: "eot",
                    mime: "application/vnd.ms-fontobject"
                };
                if (i([6, 6, 237, 245, 216, 29, 70, 229, 189, 49, 239, 231, 254, 116, 183, 29])) return {
                    ext: "indd",
                    mime: "application/x-indesign"
                };
                if (await e.peekBuffer(t, {
                        length: Math.min(512, e.fileInfo.size),
                        mayBeLess: !0
                    }), tarHeaderChecksumMatches(t)) return {
                    ext: "tar",
                    mime: "application/x-tar"
                };
                if (i([255, 254, 255, 14, 83, 0, 107, 0, 101, 0, 116, 0, 99, 0, 104, 0, 85, 0, 112, 0, 32, 0, 77, 0, 111, 0, 100, 0, 101, 0, 108, 0])) return {
                    ext: "skp",
                    mime: "application/vnd.sketchup.skp"
                };
                if (r("-----BEGIN PGP MESSAGE-----")) return {
                    ext: "pgp",
                    mime: "application/pgp-encrypted"
                };
                if (t.length >= 2 && i([255, 224], {
                        offset: 0,
                        mask: [255, 224]
                    })) {
                    if (i([16], {
                            offset: 1,
                            mask: [22]
                        })) return i([8], {
                        offset: 1,
                        mask: [8]
                    }), {
                        ext: "aac",
                        mime: "audio/aac"
                    };
                    if (i([2], {
                            offset: 1,
                            mask: [6]
                        })) return {
                        ext: "mp3",
                        mime: "audio/mpeg"
                    };
                    if (i([4], {
                            offset: 1,
                            mask: [6]
                        })) return {
                        ext: "mp2",
                        mime: "audio/mpeg"
                    };
                    if (i([6], {
                            offset: 1,
                            mask: [6]
                        })) return {
                        ext: "mp1",
                        mime: "audio/mpeg"
                    }
                }
            }
            const stream = readableStream => new Promise(((resolve, reject) => {
                    const stream = eval("require")("stream");
                    readableStream.on("error", reject), readableStream.once("readable", (async () => {
                        const e = new stream.PassThrough;
                        let t;
                        t = stream.pipeline ? stream.pipeline(readableStream, e, (() => {})) : readableStream.pipe(e);
                        const i = readableStream.read(minimumBytes) || readableStream.read() || Buffer.alloc(0);
                        try {
                            const t = await fromBuffer(i);
                            e.fileType = t
                        } catch (e) {
                            reject(e)
                        }
                        resolve(t)
                    }))
                })),
                fileType = {
                    fromStream: fromStream,
                    fromTokenizer: fromTokenizer,
                    fromBuffer: fromBuffer,
                    stream: stream
                };
            Object.defineProperty(fileType, "extensions", {
                get: () => new Set(supported.extensions)
            }), Object.defineProperty(fileType, "mimeTypes", {
                get: () => new Set(supported.mimeTypes)
            }), module.exports = fileType
        },
        49898: e => {
            "use strict";
            e.exports = {
                extensions: ["jpg", "png", "apng", "gif", "webp", "flif", "xcf", "cr2", "cr3", "orf", "arw", "dng", "nef", "rw2", "raf", "tif", "bmp", "icns", "jxr", "psd", "indd", "zip", "tar", "rar", "gz", "bz2", "7z", "dmg", "mp4", "mid", "mkv", "webm", "mov", "avi", "mpg", "mp2", "mp3", "m4a", "oga", "ogg", "ogv", "opus", "flac", "wav", "spx", "amr", "pdf", "epub", "exe", "swf", "rtf", "wasm", "woff", "woff2", "eot", "ttf", "otf", "ico", "flv", "ps", "xz", "sqlite", "nes", "crx", "xpi", "cab", "deb", "ar", "rpm", "Z", "lz", "cfb", "mxf", "mts", "blend", "bpg", "docx", "pptx", "xlsx", "3gp", "3g2", "jp2", "jpm", "jpx", "mj2", "aif", "qcp", "odt", "ods", "odp", "xml", "mobi", "heic", "cur", "ktx", "ape", "wv", "dcm", "ics", "glb", "pcap", "dsf", "lnk", "alias", "voc", "ac3", "m4v", "m4p", "m4b", "f4v", "f4p", "f4b", "f4a", "mie", "asf", "ogm", "ogx", "mpc", "arrow", "shp", "aac", "mp1", "it", "s3m", "xm", "ai", "skp", "avif", "eps", "lzh", "pgp", "asar", "stl", "chm", "3mf", "zst", "jxl", "vcf"],
                mimeTypes: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/flif", "image/x-xcf", "image/x-canon-cr2", "image/x-canon-cr3", "image/tiff", "image/bmp", "image/vnd.ms-photo", "image/vnd.adobe.photoshop", "application/x-indesign", "application/epub+zip", "application/x-xpinstall", "application/vnd.oasis.opendocument.text", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.presentation", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/zip", "application/x-tar", "application/x-rar-compressed", "application/gzip", "application/x-bzip2", "application/x-7z-compressed", "application/x-apple-diskimage", "application/x-apache-arrow", "video/mp4", "audio/midi", "video/x-matroska", "video/webm", "video/quicktime", "video/vnd.avi", "audio/vnd.wave", "audio/qcelp", "audio/x-ms-asf", "video/x-ms-asf", "application/vnd.ms-asf", "video/mpeg", "video/3gpp", "audio/mpeg", "audio/mp4", "audio/opus", "video/ogg", "audio/ogg", "application/ogg", "audio/x-flac", "audio/ape", "audio/wavpack", "audio/amr", "application/pdf", "application/x-msdownload", "application/x-shockwave-flash", "application/rtf", "application/wasm", "font/woff", "font/woff2", "application/vnd.ms-fontobject", "font/ttf", "font/otf", "image/x-icon", "video/x-flv", "application/postscript", "application/eps", "application/x-xz", "application/x-sqlite3", "application/x-nintendo-nes-rom", "application/x-google-chrome-extension", "application/vnd.ms-cab-compressed", "application/x-deb", "application/x-unix-archive", "application/x-rpm", "application/x-compress", "application/x-lzip", "application/x-cfb", "application/x-mie", "application/mxf", "video/mp2t", "application/x-blender", "image/bpg", "image/jp2", "image/jpx", "image/jpm", "image/mj2", "audio/aiff", "application/xml", "application/x-mobipocket-ebook", "image/heif", "image/heif-sequence", "image/heic", "image/heic-sequence", "image/icns", "image/ktx", "application/dicom", "audio/x-musepack", "text/calendar", "text/vcard", "model/gltf-binary", "application/vnd.tcpdump.pcap", "audio/x-dsf", "application/x.ms.shortcut", "application/x.apple.alias", "audio/x-voc", "audio/vnd.dolby.dd-raw", "audio/x-m4a", "image/apng", "image/x-olympus-orf", "image/x-sony-arw", "image/x-adobe-dng", "image/x-nikon-nef", "image/x-panasonic-rw2", "image/x-fujifilm-raf", "video/x-m4v", "video/3gpp2", "application/x-esri-shape", "audio/aac", "audio/x-it", "audio/x-s3m", "audio/x-xm", "video/MP1S", "video/MP2P", "application/vnd.sketchup.skp", "image/avif", "application/x-lzh-compressed", "application/pgp-encrypted", "application/x-asar", "model/stl", "application/vnd.ms-htmlhelp", "model/3mf", "image/jxl", "application/zstd"]
            }
        },
        476188: (e, t) => {
            "use strict";
            t.stringToBytes = e => [...e].map((e => e.charCodeAt(0))), t.tarHeaderChecksumMatches = (e, t = 0) => {
                const i = parseInt(e.toString("utf8", 148, 154).replace(/\0.*$/, "").trim(), 8);
                if (isNaN(i)) return !1;
                let r = 256;
                for (let i = t; i < t + 148; i++) r += e[i];
                for (let i = t + 156; i < t + 512; i++) r += e[i];
                return i === r
            }, t.uint32SyncSafeToken = {
                get: (e, t) => 127 & e[t + 3] | e[t + 2] << 7 | e[t + 1] << 14 | e[t] << 21,
                len: 4
            }
        },
        28985: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.Deferred = void 0;
            t.Deferred = class {
                constructor() {
                    this.resolve = () => null, this.reject = () => null, this.promise = new Promise(((e, t) => {
                        this.reject = t, this.resolve = e
                    }))
                }
            }
        },
        637279: (e, t) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.EndOfStreamError = t.defaultMessages = void 0, t.defaultMessages = "End-Of-Stream";
            class i extends Error {
                constructor() {
                    super(t.defaultMessages)
                }
            }
            t.EndOfStreamError = i
        },
        256654: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.StreamReader = t.EndOfStreamError = void 0;
            const r = i(637279),
                n = i(28985);
            var a = i(637279);
            Object.defineProperty(t, "EndOfStreamError", {
                enumerable: !0,
                get: function() {
                    return a.EndOfStreamError
                }
            });
            t.StreamReader = class {
                constructor(e) {
                    if (this.s = e, this.deferred = null, this.endOfStream = !1, this.peekQueue = [], !e.read || !e.once) throw new Error("Expected an instance of stream.Readable");
                    this.s.once("end", (() => this.reject(new r.EndOfStreamError))), this.s.once("error", (e => this.reject(e))), this.s.once("close", (() => this.reject(new Error("Stream closed"))))
                }
                async peek(e, t, i) {
                    const r = await this.read(e, t, i);
                    return this.peekQueue.push(e.subarray(t, t + r)), r
                }
                async read(e, t, i) {
                    if (0 === i) return 0;
                    if (0 === this.peekQueue.length && this.endOfStream) throw new r.EndOfStreamError;
                    let n = i,
                        a = 0;
                    for (; this.peekQueue.length > 0 && n > 0;) {
                        const i = this.peekQueue.pop();
                        if (!i) throw new Error("peekData should be defined");
                        const r = Math.min(i.length, n);
                        e.set(i.subarray(0, r), t + a), a += r, n -= r, r < i.length && this.peekQueue.push(i.subarray(r))
                    }
                    for (; n > 0 && !this.endOfStream;) {
                        const i = Math.min(n, 1048576),
                            r = await this.readFromStream(e, t + a, i);
                        if (a += r, r < i) break;
                        n -= r
                    }
                    return a
                }
                async readFromStream(e, t, i) {
                    const r = this.s.read(i);
                    if (r) return e.set(r, t), r.length; {
                        const r = {
                            buffer: e,
                            offset: t,
                            length: i,
                            deferred: new n.Deferred
                        };
                        return this.deferred = r.deferred, this.s.once("readable", (() => {
                            this.readDeferred(r)
                        })), r.deferred.promise
                    }
                }
                readDeferred(e) {
                    const t = this.s.read(e.length);
                    t ? (e.buffer.set(t, e.offset), e.deferred.resolve(t.length), this.deferred = null) : this.s.once("readable", (() => {
                        this.readDeferred(e)
                    }))
                }
                reject(e) {
                    this.endOfStream = !0, this.deferred && (this.deferred.reject(e), this.deferred = null)
                }
            }
        },
        655167: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.StreamReader = t.EndOfStreamError = void 0;
            var r = i(637279);
            Object.defineProperty(t, "EndOfStreamError", {
                enumerable: !0,
                get: function() {
                    return r.EndOfStreamError
                }
            });
            var n = i(256654);
            Object.defineProperty(t, "StreamReader", {
                enumerable: !0,
                get: function() {
                    return n.StreamReader
                }
            })
        },
        180842: (e, t, i) => {
            "use strict";
            var r = i(348764).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AbstractTokenizer = void 0;
            const n = i(655167);
            t.AbstractTokenizer = class {
                constructor(e) {
                    this.position = 0, this.numBuffer = new Uint8Array(8), this.fileInfo = e || {}
                }
                async readToken(e, t = this.position) {
                    const i = r.alloc(e.len);
                    if (await this.readBuffer(i, {
                            position: t
                        }) < e.len) throw new n.EndOfStreamError;
                    return e.get(i, 0)
                }
                async peekToken(e, t = this.position) {
                    const i = r.alloc(e.len);
                    if (await this.peekBuffer(i, {
                            position: t
                        }) < e.len) throw new n.EndOfStreamError;
                    return e.get(i, 0)
                }
                async readNumber(e) {
                    if (await this.readBuffer(this.numBuffer, {
                            length: e.len
                        }) < e.len) throw new n.EndOfStreamError;
                    return e.get(this.numBuffer, 0)
                }
                async peekNumber(e) {
                    if (await this.peekBuffer(this.numBuffer, {
                            length: e.len
                        }) < e.len) throw new n.EndOfStreamError;
                    return e.get(this.numBuffer, 0)
                }
                async ignore(e) {
                    if (void 0 !== this.fileInfo.size) {
                        const t = this.fileInfo.size - this.position;
                        if (e > t) return this.position += t, t
                    }
                    return this.position += e, e
                }
                async close() {}
                normalizeOptions(e, t) {
                    if (t && void 0 !== t.position && t.position < this.position) throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
                    return t ? {
                        mayBeLess: !0 === t.mayBeLess,
                        offset: t.offset ? t.offset : 0,
                        length: t.length ? t.length : e.length - (t.offset ? t.offset : 0),
                        position: t.position ? t.position : this.position
                    } : {
                        mayBeLess: !1,
                        offset: 0,
                        length: e.length,
                        position: this.position
                    }
                }
            }
        },
        630778: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.BufferTokenizer = void 0;
            const r = i(655167),
                n = i(180842);
            class a extends n.AbstractTokenizer {
                constructor(e, t) {
                    super(t), this.uint8Array = e, this.fileInfo.size = this.fileInfo.size ? this.fileInfo.size : e.length
                }
                async readBuffer(e, t) {
                    if (t && t.position) {
                        if (t.position < this.position) throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
                        this.position = t.position
                    }
                    const i = await this.peekBuffer(e, t);
                    return this.position += i, i
                }
                async peekBuffer(e, t) {
                    const i = this.normalizeOptions(e, t),
                        n = Math.min(this.uint8Array.length - i.position, i.length);
                    if (!i.mayBeLess && n < i.length) throw new r.EndOfStreamError;
                    return e.set(this.uint8Array.subarray(i.position, i.position + n), i.offset), n
                }
                async close() {}
            }
            t.BufferTokenizer = a
        },
        127859: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.fromFile = t.FileTokenizer = void 0;
            const r = i(180842),
                n = i(655167),
                a = i(77209);
            class o extends r.AbstractTokenizer {
                constructor(e, t) {
                    super(t), this.fd = e
                }
                async readBuffer(e, t) {
                    const i = this.normalizeOptions(e, t);
                    this.position = i.position;
                    const r = await a.read(this.fd, e, i.offset, i.length, i.position);
                    if (this.position += r.bytesRead, r.bytesRead < i.length && (!t || !t.mayBeLess)) throw new n.EndOfStreamError;
                    return r.bytesRead
                }
                async peekBuffer(e, t) {
                    const i = this.normalizeOptions(e, t),
                        r = await a.read(this.fd, e, i.offset, i.length, i.position);
                    if (!i.mayBeLess && r.bytesRead < i.length) throw new n.EndOfStreamError;
                    return r.bytesRead
                }
                async close() {
                    return a.close(this.fd)
                }
            }
            t.FileTokenizer = o, t.fromFile = async function(e) {
                const t = await a.stat(e);
                if (!t.isFile) throw new Error(`File not a file: ${e}`);
                const i = await a.open(e, "r");
                return new o(i, {
                    path: e,
                    size: t.size
                })
            }
        },
        77209: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.readFile = t.writeFileSync = t.writeFile = t.read = t.open = t.close = t.stat = t.createReadStream = t.pathExists = void 0;
            const r = i(47016);
            t.pathExists = r.existsSync, t.createReadStream = r.createReadStream, t.stat = async function(e) {
                return new Promise(((t, i) => {
                    r.stat(e, ((e, r) => {
                        e ? i(e) : t(r)
                    }))
                }))
            }, t.close = async function(e) {
                return new Promise(((t, i) => {
                    r.close(e, (e => {
                        e ? i(e) : t()
                    }))
                }))
            }, t.open = async function(e, t) {
                return new Promise(((i, n) => {
                    r.open(e, t, ((e, t) => {
                        e ? n(e) : i(t)
                    }))
                }))
            }, t.read = async function(e, t, i, n, a) {
                return new Promise(((o, s) => {
                    r.read(e, t, i, n, a, ((e, t, i) => {
                        e ? s(e) : o({
                            bytesRead: t,
                            buffer: i
                        })
                    }))
                }))
            }, t.writeFile = async function(e, t) {
                return new Promise(((i, n) => {
                    r.writeFile(e, t, (e => {
                        e ? n(e) : i()
                    }))
                }))
            }, t.writeFileSync = function(e, t) {
                r.writeFileSync(e, t)
            }, t.readFile = async function(e) {
                return new Promise(((t, i) => {
                    r.readFile(e, ((e, r) => {
                        e ? i(e) : t(r)
                    }))
                }))
            }
        },
        120599: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.ReadStreamTokenizer = void 0;
            const r = i(180842),
                n = i(655167);
            class a extends r.AbstractTokenizer {
                constructor(e, t) {
                    super(t), this.streamReader = new n.StreamReader(e)
                }
                async getFileInfo() {
                    return this.fileInfo
                }
                async readBuffer(e, t) {
                    const i = this.normalizeOptions(e, t),
                        r = i.position - this.position;
                    if (r > 0) return await this.ignore(r), this.readBuffer(e, t);
                    if (r < 0) throw new Error("`options.position` must be equal or greater than `tokenizer.position`");
                    if (0 === i.length) return 0;
                    const a = await this.streamReader.read(e, i.offset, i.length);
                    if (this.position += a, (!t || !t.mayBeLess) && a < i.length) throw new n.EndOfStreamError;
                    return a
                }
                async peekBuffer(e, t) {
                    const i = this.normalizeOptions(e, t);
                    let r = 0;
                    if (i.position) {
                        const t = i.position - this.position;
                        if (t > 0) {
                            const n = new Uint8Array(i.length + t);
                            return r = await this.peekBuffer(n, {
                                mayBeLess: i.mayBeLess
                            }), e.set(n.subarray(t), i.offset), r - t
                        }
                        if (t < 0) throw new Error("Cannot peek from a negative offset in a stream")
                    }
                    if (i.length > 0) {
                        try {
                            r = await this.streamReader.peek(e, i.offset, i.length)
                        } catch (e) {
                            if (t && t.mayBeLess && e instanceof n.EndOfStreamError) return 0;
                            throw e
                        }
                        if (!i.mayBeLess && r < i.length) throw new n.EndOfStreamError
                    }
                    return r
                }
                async ignore(e) {
                    const t = Math.min(256e3, e),
                        i = new Uint8Array(t);
                    let r = 0;
                    for (; r < e;) {
                        const n = e - r,
                            a = await this.readBuffer(i, {
                                length: Math.min(t, n)
                            });
                        if (a < 0) return a;
                        r += a
                    }
                    return r
                }
            }
            t.ReadStreamTokenizer = a
        },
        835849: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.fromBuffer = t.fromStream = t.EndOfStreamError = void 0;
            const r = i(120599),
                n = i(630778);
            var a = i(655167);
            Object.defineProperty(t, "EndOfStreamError", {
                enumerable: !0,
                get: function() {
                    return a.EndOfStreamError
                }
            }), t.fromStream = function(e, t) {
                return t = t || {}, new r.ReadStreamTokenizer(e, t)
            }, t.fromBuffer = function(e, t) {
                return new n.BufferTokenizer(e, t)
            }
        },
        726597: (e, t, i) => {
            "use strict";
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.fromStream = t.fromBuffer = t.EndOfStreamError = t.fromFile = void 0;
            const r = i(77209),
                n = i(835849);
            var a = i(127859);
            Object.defineProperty(t, "fromFile", {
                enumerable: !0,
                get: function() {
                    return a.fromFile
                }
            });
            var o = i(835849);
            Object.defineProperty(t, "EndOfStreamError", {
                enumerable: !0,
                get: function() {
                    return o.EndOfStreamError
                }
            }), Object.defineProperty(t, "fromBuffer", {
                enumerable: !0,
                get: function() {
                    return o.fromBuffer
                }
            }), t.fromStream = async function(e, t) {
                if (t = t || {}, e.path) {
                    const i = await r.stat(e.path);
                    t.path = e.path, t.size = i.size
                }
                return n.fromStream(e, t)
            }
        },
        583416: (e, t, i) => {
            "use strict";
            var r = i(348764).Buffer;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.AnsiStringType = t.StringType = t.BufferType = t.Uint8ArrayType = t.IgnoreType = t.Float80_LE = t.Float80_BE = t.Float64_LE = t.Float64_BE = t.Float32_LE = t.Float32_BE = t.Float16_LE = t.Float16_BE = t.INT64_BE = t.UINT64_BE = t.INT64_LE = t.UINT64_LE = t.INT32_LE = t.INT32_BE = t.INT24_BE = t.INT24_LE = t.INT16_LE = t.INT16_BE = t.INT8 = t.UINT32_BE = t.UINT32_LE = t.UINT24_BE = t.UINT24_LE = t.UINT16_BE = t.UINT16_LE = t.UINT8 = void 0;
            const n = i(51765);

            function a(e) {
                return new DataView(e.buffer, e.byteOffset)
            }
            t.UINT8 = {
                len: 1,
                get: (e, t) => a(e).getUint8(t),
                put: (e, t, i) => (a(e).setUint8(t, i), t + 1)
            }, t.UINT16_LE = {
                len: 2,
                get: (e, t) => a(e).getUint16(t, !0),
                put: (e, t, i) => (a(e).setUint16(t, i, !0), t + 2)
            }, t.UINT16_BE = {
                len: 2,
                get: (e, t) => a(e).getUint16(t),
                put: (e, t, i) => (a(e).setUint16(t, i), t + 2)
            }, t.UINT24_LE = {
                len: 3,
                get(e, t) {
                    const i = a(e);
                    return i.getUint8(t) + (i.getUint16(t + 1, !0) << 8)
                },
                put(e, t, i) {
                    const r = a(e);
                    return r.setUint8(t, 255 & i), r.setUint16(t + 1, i >> 8, !0), t + 3
                }
            }, t.UINT24_BE = {
                len: 3,
                get(e, t) {
                    const i = a(e);
                    return (i.getUint16(t) << 8) + i.getUint8(t + 2)
                },
                put(e, t, i) {
                    const r = a(e);
                    return r.setUint16(t, i >> 8), r.setUint8(t + 2, 255 & i), t + 3
                }
            }, t.UINT32_LE = {
                len: 4,
                get: (e, t) => a(e).getUint32(t, !0),
                put: (e, t, i) => (a(e).setUint32(t, i, !0), t + 4)
            }, t.UINT32_BE = {
                len: 4,
                get: (e, t) => a(e).getUint32(t),
                put: (e, t, i) => (a(e).setUint32(t, i), t + 4)
            }, t.INT8 = {
                len: 1,
                get: (e, t) => a(e).getInt8(t),
                put: (e, t, i) => (a(e).setInt8(t, i), t + 1)
            }, t.INT16_BE = {
                len: 2,
                get: (e, t) => a(e).getInt16(t),
                put: (e, t, i) => (a(e).setInt16(t, i), t + 2)
            }, t.INT16_LE = {
                len: 2,
                get: (e, t) => a(e).getInt16(t, !0),
                put: (e, t, i) => (a(e).setInt16(t, i, !0), t + 2)
            }, t.INT24_LE = {
                len: 3,
                get(e, i) {
                    const r = t.UINT24_LE.get(e, i);
                    return r > 8388607 ? r - 16777216 : r
                },
                put(e, t, i) {
                    const r = a(e);
                    return r.setUint8(t, 255 & i), r.setUint16(t + 1, i >> 8, !0), t + 3
                }
            }, t.INT24_BE = {
                len: 3,
                get(e, i) {
                    const r = t.UINT24_BE.get(e, i);
                    return r > 8388607 ? r - 16777216 : r
                },
                put(e, t, i) {
                    const r = a(e);
                    return r.setUint16(t, i >> 8), r.setUint8(t + 2, 255 & i), t + 3
                }
            }, t.INT32_BE = {
                len: 4,
                get: (e, t) => a(e).getInt32(t),
                put: (e, t, i) => (a(e).setInt32(t, i), t + 4)
            }, t.INT32_LE = {
                len: 4,
                get: (e, t) => a(e).getInt32(t, !0),
                put: (e, t, i) => (a(e).setInt32(t, i, !0), t + 4)
            }, t.UINT64_LE = {
                len: 8,
                get: (e, t) => a(e).getBigUint64(t, !0),
                put: (e, t, i) => (a(e).setBigUint64(t, i, !0), t + 8)
            }, t.INT64_LE = {
                len: 8,
                get: (e, t) => a(e).getBigInt64(t, !0),
                put: (e, t, i) => (a(e).setBigInt64(t, i, !0), t + 8)
            }, t.UINT64_BE = {
                len: 8,
                get: (e, t) => a(e).getBigUint64(t),
                put: (e, t, i) => (a(e).setBigUint64(t, i), t + 8)
            }, t.INT64_BE = {
                len: 8,
                get: (e, t) => a(e).getBigInt64(t),
                put: (e, t, i) => (a(e).setBigInt64(t, i), t + 8)
            }, t.Float16_BE = {
                len: 2,
                get(e, t) {
                    return n.read(e, t, !1, 10, this.len)
                },
                put(e, t, i) {
                    return n.write(e, i, t, !1, 10, this.len), t + this.len
                }
            }, t.Float16_LE = {
                len: 2,
                get(e, t) {
                    return n.read(e, t, !0, 10, this.len)
                },
                put(e, t, i) {
                    return n.write(e, i, t, !0, 10, this.len), t + this.len
                }
            }, t.Float32_BE = {
                len: 4,
                get: (e, t) => a(e).getFloat32(t),
                put: (e, t, i) => (a(e).setFloat32(t, i), t + 4)
            }, t.Float32_LE = {
                len: 4,
                get: (e, t) => a(e).getFloat32(t, !0),
                put: (e, t, i) => (a(e).setFloat32(t, i, !0), t + 4)
            }, t.Float64_BE = {
                len: 8,
                get: (e, t) => a(e).getFloat64(t),
                put: (e, t, i) => (a(e).setFloat64(t, i), t + 8)
            }, t.Float64_LE = {
                len: 8,
                get: (e, t) => a(e).getFloat64(t, !0),
                put: (e, t, i) => (a(e).setFloat64(t, i, !0), t + 8)
            }, t.Float80_BE = {
                len: 10,
                get(e, t) {
                    return n.read(e, t, !1, 63, this.len)
                },
                put(e, t, i) {
                    return n.write(e, i, t, !1, 63, this.len), t + this.len
                }
            }, t.Float80_LE = {
                len: 10,
                get(e, t) {
                    return n.read(e, t, !0, 63, this.len)
                },
                put(e, t, i) {
                    return n.write(e, i, t, !0, 63, this.len), t + this.len
                }
            };
            t.IgnoreType = class {
                constructor(e) {
                    this.len = e
                }
                get(e, t) {}
            };
            t.Uint8ArrayType = class {
                constructor(e) {
                    this.len = e
                }
                get(e, t) {
                    return e.subarray(t, t + this.len)
                }
            };
            t.BufferType = class {
                constructor(e) {
                    this.len = e
                }
                get(e, t) {
                    return r.from(e.subarray(t, t + this.len))
                }
            };
            t.StringType = class {
                constructor(e, t) {
                    this.len = e, this.encoding = t
                }
                get(e, t) {
                    return r.from(e).toString(this.encoding, t, t + this.len)
                }
            };
            class o {
                constructor(e) {
                    this.len = e
                }
                static decode(e, t, i) {
                    let r = "";
                    for (let n = t; n < i; ++n) r += o.codePointToString(o.singleByteDecoder(e[n]));
                    return r
                }
                static inRange(e, t, i) {
                    return t <= e && e <= i
                }
                static codePointToString(e) {
                    return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
                }
                static singleByteDecoder(e) {
                    if (o.inRange(e, 0, 127)) return e;
                    const t = o.windows1252[e - 128];
                    if (null === t) throw Error("invaliding encoding");
                    return t
                }
                get(e, t = 0) {
                    return o.decode(e, t, t + this.len)
                }
            }
            t.AnsiStringType = o, o.windows1252 = [8364, 129, 8218, 402, 8222, 8230, 8224, 8225, 710, 8240, 352, 8249, 338, 141, 381, 143, 144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255]
        },
        51765: (e, t) => {
            t.read = function(e, t, i, r, n) {
                var a, o, s = 8 * n - r - 1,
                    f = (1 << s) - 1,
                    m = f >> 1,
                    p = -7,
                    c = i ? n - 1 : 0,
                    u = i ? -1 : 1,
                    l = e[t + c];
                for (c += u, a = l & (1 << -p) - 1, l >>= -p, p += s; p > 0; a = 256 * a + e[t + c], c += u, p -= 8);
                for (o = a & (1 << -p) - 1, a >>= -p, p += r; p > 0; o = 256 * o + e[t + c], c += u, p -= 8);
                if (0 === a) a = 1 - m;
                else {
                    if (a === f) return o ? NaN : 1 / 0 * (l ? -1 : 1);
                    o += Math.pow(2, r), a -= m
                }
                return (l ? -1 : 1) * o * Math.pow(2, a - r)
            }, t.write = function(e, t, i, r, n, a) {
                var o, s, f, m = 8 * a - n - 1,
                    p = (1 << m) - 1,
                    c = p >> 1,
                    u = 23 === n ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    l = r ? 0 : a - 1,
                    d = r ? 1 : -1,
                    g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, o = p) : (o = Math.floor(Math.log(t) / Math.LN2), t * (f = Math.pow(2, -o)) < 1 && (o--, f *= 2), (t += o + c >= 1 ? u / f : u * Math.pow(2, 1 - c)) * f >= 2 && (o++, f /= 2), o + c >= p ? (s = 0, o = p) : o + c >= 1 ? (s = (t * f - 1) * Math.pow(2, n), o += c) : (s = t * Math.pow(2, c - 1) * Math.pow(2, n), o = 0)); n >= 8; e[i + l] = 255 & s, l += d, s /= 256, n -= 8);
                for (o = o << n | s, m += n; m > 0; e[i + l] = 255 & o, l += d, o /= 256, m -= 8);
                e[i + l - d] |= 128 * g
            }
        }
    }
]);
//# sourceMappingURL=21865-3cf299d86cfe11b7b3a8.js.map