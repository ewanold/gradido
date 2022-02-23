import { UserInterface } from '../../interface/UserInterface'

export const raeuberHotzenplotz: UserInterface = {
  email: 'raeuber@hotzenplotz.de',
  firstName: 'Räuber',
  lastName: 'Hotzenplotz',
  // description: 'Pfefferpistole',
  password: BigInt('12123692783243004812'),
  pubKey: Buffer.from('d7c70f94234dff071d982aa8f41583876c356599773b5911b39080da2b8c2d2b', 'hex'),
  privKey: Buffer.from(
    'c4ede7e7e65acd4cc0a2d91136ee8f753c6903b3594798afde341092b21a4c1589f296d43c6e7adcd7602fcc2a2bcbf74c9f42453ad49cc5186eadf654bbd2c5fa9aa027f152592819246da896ebfcd2',
    'hex',
  ),
  emailHash: Buffer.from('ec8d34112adb40ff2f6538b05660b03440372690f034cd7d6322d17020233c77', 'hex'),
  createdAt: new Date('2021-11-26T11:32:16'),
  emailChecked: true,
  language: 'de',
  passphrase:
    'gospel trip tenant mouse spider skill auto curious man video chief response same little over expire drum display fancy clinic keen throw urge basket ',
  isAdmin: false,
  addBalance: true,
  balanceModified: new Date('2021-11-30T10:37:13'),
  recordDate: new Date('2021-11-30T10:37:13'),
  creationDate: new Date('2021-08-01 00:00:00'),
  amount: 10000000,
  creationTxHash: Buffer.from(
    '23ba44fd84deb59b9f32969ad0cb18bfa4588be1bdb99c396888506474c16c1900000000000000000000000000000000',
    'hex',
  ),
  signature: Buffer.from(
    '756d3da061687c575d1dbc5073908f646aa5f498b0927b217c83b48af471450e571dfe8421fb8e1f1ebd1104526b7e7c6fa78684e2da59c8f7f5a8dc3d9e5b0b',
    'hex',
  ),
}
