
export const getPushStatus = (statusCode) => {

    switch (statusCode) {

        case 10:
            return 'Enviado com sucesso';
        case 5:
            return 'Cancelado';
        case 6:
            return 'Falha no envio';
        case 1:
        default:
            return 'Aguardando envio';
    }

};


export const getCampaignStatus = (statusCode) => {

    switch (statusCode) {
        case 9:
            return 'Cancelada';
        case 4:
            return 'Em Pausa';
        case 3:
            return 'Finalizada';
        case 2:
            return 'Em Progresso';
        case 1:
        default:
            return 'Nova';
    }
};
