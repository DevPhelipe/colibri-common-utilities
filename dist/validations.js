const Validations = {
    isNumeric(value) {
        return /^\d+$/.test(value);
    },
    isLetter(value) {
        return /[A-Z]|[a-z]+/.test(value);
    },
    isValidEmail(email) {
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    },
    isValidCNPJ(cnpj) {
        if (!cnpj || typeof cnpj !== 'string')
            return false;
        cnpj = cnpj.replace(/[^0-9A-Za-z]/g, '').toUpperCase();
        if (cnpj.length !== 14)
            return false;
        if (/^[0]+$/.test(cnpj))
            return false;
        const PESOS_DV = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const VALOR_BASE = '0'.charCodeAt(0);
        const calculaDigito = (seq) => {
            let soma = 0;
            for (let i = seq.length - 1; i >= 0; i--) {
                const valorChar = seq.charCodeAt(i) - VALOR_BASE;
                soma += valorChar * PESOS_DV[PESOS_DV.length - seq.length + i];
            }
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
        const base = cnpj.substring(0, 12);
        const dvInformado = cnpj.substring(12, 14);
        if (!/^[A-Z0-9]{12}\d{2}$/.test(cnpj))
            return false;
        const dv1 = calculaDigito(base);
        const dv2 = calculaDigito(base + dv1.toString());
        const dvCalculado = `${dv1}${dv2}`;
        return dvCalculado === dvInformado;
    },
};
export default Validations;
//# sourceMappingURL=validations.js.map