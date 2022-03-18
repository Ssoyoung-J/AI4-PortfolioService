import {CertificateModel} from '../schemas/certificate';

class Certificate {
    // 새로운 자격증 등록
    static async create({newCertificate}){
        const createdNewCertificate = await CertificateModel.create(newCertificate);
        return createdNewCertificate;
    }
    // 자격증의 Id 기준 검색
    static async findById({certificateId}) {
        const certificate = await CertificateModel.findOne({id : certificateId});
        return certificate;
    }
    // 사용자의 Id 기준 검색
    static async findByUserId({ userId }){
        const certificates = await CertificateModel.find({userId});
        return certificates;
    }
    // 자격증 내용 수정
    static async update({certificateId,fieldToUpdate, newValue}){
        const filter = {id: certificateId};
        const update = {[fieldToUpdate]: newValue};
        const option = {returnOriginal: false};

        const updateCertificate = await CertificateModel.findOneAndUpdate( filter, update, option);
        return updateCertificate;
    }
    // 자격증 삭제
    // static async delete({createdCertificate}){
    //     const deletedCertificate = await CertificateModel.delete({createdCertificate});
    //     return deletedCertificate;
    // }

}

export {Certificate};