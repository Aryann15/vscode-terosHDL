// Copyright 2023
// Carlos Alberto Ruiz Naranjo [carlosruiznaranjo@gmail.com]
// Ismael Perez Rojo [ismaelprojo@gmail.com]
//
// This file is part of TerosHDL
//
// Colibri is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Colibri is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with TerosHDL.  If not, see <https://www.gnu.org/licenses/>.

////////////////////////////////////////////////////////////////////////////////
// Languages
////////////////////////////////////////////////////////////////////////////////
/**
 * Enum representing different programming languages.
 */
export enum LANGUAGE {
    VHDL = "vhdlSource",
    VERILOG = "verilogSource",
    SYSTEMVERILOG = "systemVerilogSource",
    C = "cSource",
    CPP = "cppSource",
    PYTHON = "python",
    VERIBLELINTRULES = "veribleLintRules",
    TCL = "tclSource",
    XDC = "xdc",
    SDC = "sdc",
    PIN = "pin",
    XCI = "xci",
    SBY = "sbyConfigTemplate",
    PRO = "osvvmProject",
    // Intel Quartus IP file
    QIP = "QIP",
    // Xilinx ISE constraint file
    UCF = "UCF",
    IP = "IP",
    QSYS = "QSYS",
    NONE = "none"
}

export function getLanguageEnumValue(value: string): LANGUAGE {
    for (const key in LANGUAGE) {
        if (LANGUAGE[key as keyof typeof LANGUAGE] === value) {
            return LANGUAGE[key as keyof typeof LANGUAGE];
        }
    }
    return LANGUAGE.NONE;
}

////////////////////////////////////////////////////////////////////////////////
// Versions
////////////////////////////////////////////////////////////////////////////////
/**
 * Enum representing the versions of VHDL language.
 */
export enum VHDL_LANG_VERSION {
    v2008 = "2008",
    v93 = "93",
    v2000 = "2000",
}

/**
 * Enum representing the versions of the Verilog language.
 */
export enum VERILOG_LANG_VERSION {
    v2000 = "2000",
    v2005 = "2005",
}

export type t_version_inst = VHDL_LANG_VERSION | VERILOG_LANG_VERSION | undefined;
export type t_versions = (t_version_inst)[] | undefined;

/**
 * List of language versions.
 * @typedef {Record<LANGUAGE, t_versions>} LANGUAGE_VERSIONS_LIST
 */
export const LANGUAGE_VERSIONS_LIST: Record<LANGUAGE, t_versions> = {
    [LANGUAGE.VHDL]: Object.values(VHDL_LANG_VERSION),
    [LANGUAGE.VERILOG]: Object.values(VERILOG_LANG_VERSION),
    [LANGUAGE.SYSTEMVERILOG]: undefined,
    [LANGUAGE.CPP]: undefined,
    [LANGUAGE.C]: undefined,
    [LANGUAGE.PYTHON]: undefined,
    [LANGUAGE.VERIBLELINTRULES]: undefined,
    [LANGUAGE.TCL]: undefined,
    [LANGUAGE.XDC]: undefined,
    [LANGUAGE.SDC]: undefined,
    [LANGUAGE.PIN]: undefined,
    [LANGUAGE.XCI]: undefined,
    [LANGUAGE.SBY]: undefined,
    [LANGUAGE.PRO]: undefined,
    [LANGUAGE.NONE]: undefined,
    [LANGUAGE.QIP]: undefined,
    [LANGUAGE.UCF]: undefined,
    [LANGUAGE.IP]: undefined,
    [LANGUAGE.QSYS]: undefined,
};

export function getLanguageVersion(language: LANGUAGE, version: string | undefined): t_version_inst {
    const versions = LANGUAGE_VERSIONS_LIST[language];
    if (versions && version) {
        for (const v of versions) {
            if (v === version) {
                return v;
            }
        }
    }
    return undefined;
}

////////////////////////////////////////////////////////////////////////////////
// Extensions
////////////////////////////////////////////////////////////////////////////////
/**
 * A mapping of file extensions to language types.
 */
export const LANGUAGE_EXTENSION_LIST: { [key: string]: LANGUAGE } = {
    // VHDL
    "vhd": LANGUAGE.VHDL,
    "vho": LANGUAGE.VHDL,
    "vhdl": LANGUAGE.VHDL,
    // Verilog
    "v": LANGUAGE.VERILOG,
    "vh": LANGUAGE.VERILOG,
    "vl": LANGUAGE.VERILOG,
    // SystemVerilog
    "sv": LANGUAGE.SYSTEMVERILOG,
    "svh": LANGUAGE.SYSTEMVERILOG,
    // CPP
    "cpp": LANGUAGE.CPP,
    "cc": LANGUAGE.CPP,
    "cp": LANGUAGE.CPP,
    // Python
    "py": LANGUAGE.PYTHON,
    // vbl
    "vbl": LANGUAGE.VERIBLELINTRULES,
    // tcl
    "tcl": LANGUAGE.TCL,
    // xdc
    "xdc": LANGUAGE.XDC,
    // sdc
    "sdc": LANGUAGE.SDC,
    // pin
    "pin": LANGUAGE.PIN,
    // xci
    "xci": LANGUAGE.XCI,
    // sby
    "sby": LANGUAGE.SBY,
    // pro
    "pro": LANGUAGE.PRO,
    // IP
    "ip": LANGUAGE.IP,
    // QSYS
    "qsys": LANGUAGE.QSYS,
};