import {CertificateModel} from '../schemas/certificate';

class Certificate {
    static async create({newCertificate}){
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }

    static async findById({certificateId}) {
        const certificate = await CertificateModel.findOne({id : certificateId});
        return certificate;
    }
    static async findByUserId({ userId }){
        const certificates = await CertificateModel.find({userId});
        return certificates;
    }
    static async update({certificateId,fieldToUpdate, newValue}){
        const filter = {id: certificateId};
        const update = {[fieldToUpdate]: newValue};
        const option = {returnOriginal: false};

        const updateCertificate = await CertificateModel.findOneAndUpdate( filter, update, option);
        return updateCertificate;
    }
    // 자격증 삭제
    static async deleteById({certificateId}){
        const deleteCertificate = await CertificateModel.delete({id : certificateId});
        const isDataDeleted = deleteCertificate.deletedCount ===1;
        return isDataDeleted;
    }
    

}

export {Certificate};