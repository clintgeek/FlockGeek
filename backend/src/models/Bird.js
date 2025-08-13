import mongoose from 'mongoose';

const BirdSchema = new mongoose.Schema(
  {
    ownerId: { type: String, required: true, index: true },
    orgId: { type: String },
    farmId: { type: String },
    name: { type: String },
    tagId: { type: String, required: true },
    species: { type: String, default: 'chicken' },
    breed: { type: String },
    strain: { type: String },
    cross: { type: Boolean, default: false },
    sex: { type: String, enum: ['pullet', 'hen', 'cockerel', 'rooster', 'unknown'], default: 'unknown' },
    hatchDate: { type: Date },
    origin: { type: String, enum: ['own_egg', 'purchased', 'traded', 'rescued', 'unknown'], default: 'unknown' },
    foundationStock: { type: Boolean, default: false },
    sireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bird', default: null },
    damId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bird', default: null },
    temperamentScore: { type: Number },
    status: { type: String, enum: ['active', 'culled', 'deceased', 'sold'], default: 'active' },
    statusDate: { type: Date },
    statusReason: { type: String },
    notes: { type: String },
    deletedAt: { type: Date }
  },
  { timestamps: true }
);

BirdSchema.index({ ownerId: 1, tagId: 1 }, { unique: true });
BirdSchema.index({ ownerId: 1, name: 1 });
BirdSchema.index({ ownerId: 1, sireId: 1 });
BirdSchema.index({ ownerId: 1, damId: 1 });

export default mongoose.model('Bird', BirdSchema);
