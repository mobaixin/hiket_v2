// pages/about/about.
const app = getApp();

Page({
    data: {
        adminInfo: [
            {
                adminWeixinAvatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/owcQAbjUWRRMaywxzMArsxzm2iaWtC07ZeJL4aT7fqsDQsFNrZLlvnzPCibw3rGkdHZXKONgsy6A6QCEAXkatmAg/132",
                adminWeixinNumber: 'F_Mortal',
                id: 0,
            },
            {
                adminWeixinAvatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epibWGBicjxNBLP339CKrEHo5icI7Bp9JhQ8TDAQwyh2XKvxic262rrqPxXt6LcRjjN9ftZHneGia5QMyQ/132",
                adminWeixinNumber: "Mo-Bai-Xin",
                id: 1,
            }
        ],


        modalCopySuccessMessage: '复制成功',
        headlines: ['防骗指南', '嗨市用户服务协议', '关于我们'],
        sectionInfos: [
            '　　我们的平台用户是经过校园身份实名认证的，这很大程度地保障了交易的安全，但百密一疏，用户仍然应该对网络交易保持警惕，不能掉以轻心。下面是为用户总结的防骗指南。',
            '　　尊敬的用户，在您访问、浏览或使用嗨市小程序应用程序（以下统称“嗨市平台”）及相关服务时，表明您已审慎阅读、充分理解本协议项下所有条款并同意接受本协议的约束，保证遵守所有适用的法律法规。\n　　嗨市平台可能会根据需要修订或者更新本协议及其相关补充和附件、平台规则、单项服务规则等文件，修订或更新后的协议和文本自公布之日起生效。您应经常访问本页面以了解当前条款，如果您不接受相关修订和更新，请立即停止使用嗨市平台提供的服务；如您继续使用嗨市平台提供的服务，即表示您已经充分接受该修订或更新。',
            '　　 “嗨市”由南开大学软件学院学生与商学院学生创建于2019年5月，致力于为南开大学学生提供二手物品信息。目前，“嗨市”的主要功能模块为二手信息发布平台，未来会扩展实时互助等其他社交类模块，成为为南开学子提供多元化生活信息平台。欢迎南开人在使用“嗨市”的过程中，为我们这只初出茅庐的团队提出宝贵的意见！'
        ],
        sections: [
            [
                {
                    title: '①谨慎交易',
                    content: '谨慎交易，拒绝直接转账，我们只提供交易平台，不负责安全保障与事后追索。'
                },
                {
                    title: '②买卖时不要贪小便宜',
                    content: '一分钱、一分货，价格明显低得不正常的物品，交易时须谨慎。'
                },
                {
                    title: '③充分利用软件的社交属性',
                    content: '通过聊天、翻看评论与动态，对买卖方进行了解，降低受骗的可能性。'
                },
                {
                    title: '④谨慎确认交易',
                    content: '收到货物时请进行仔细检查。\n买卖时，在检验货物后，并确定货物与描述相符，再确认交易，一定不要直接打款。\n租赁时，买卖双方确认货物状况，以免出现掉包、破损等问题，归还时无法解决。'
                },
                {
                    title: '⑤保留证据',
                    content: '在确认交易完成之前，保留足够多的证据，包括聊天记录、交易记录、打款记录等。'
                },
                {
                    title: '⑥线下交易须小心',
                    content: '尽量去安全的地方进行线下交易，保护好自己，以防不法分子图谋不轨。同时要注当面验货，请务必当场钱货两清。'
                },
                {
                    title: '⑦时常更换密码',
                    content: '时常更换密码，确保账号安全性，降低被盗号的可能性。账号一旦被盗，请第一时间联系客服进行申诉冻结与找回。'
                },
                {
                    title: '⑧保护个人信息',
                    content: '不要将个人信息轻易外露，在公共场合谨慎选择记住密码，登录后要记得退出。'
                }
            ],
            [
                {
                    title: '1. 服务条款的确认和接纳',
                    content: '1.1 本协议是由嗨市平台负责人与您签订的用户服务协议，约定由嗨市负责人提供基于嗨市平台相关服务以及双方应遵守的协议条款。如嗨市平台的下属页面有所增加，则增加的网站作为嗨市平台提供的网络服务的一部分，仍将适用本协议的规定。嗨市平台的各项内容及服务由嗨市负责人、关联方及合作方提供。\n 1.2 您确认，在您注册、登录及浏览嗨市平台前，您应当具备中华人民共和国法律规定的与您行为相适应的民事行为能力，由于该平台面向校园学生，因此您需要具备校园学生的身份，并具有进行相关交易的资格。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。此外，您还需确保您不是任何国家、国际组织或者地域实施的限制、制裁或其他法律、规则限制的对象，否则您可能无法正常注册和登录嗨市平台，无法正常使用嗨市平台提供的服务。'
                },
                {
                    title: '2. 账户注册及使用',
                    content: '2.1【账户获得】\n 2.1.1当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，您可得嗨市平台账户并成为嗨市平台用户。\n 2.1.2您一经注册嗨市平台帐号，除非子频道要求单独开通权限，您有权利用该帐号使用嗨市平台各个频道的单项服务，当您使用嗨市平台各单项服务时，您的使用行为视为其对该单项服务的服务条款以及嗨市平台在该单项服务中发出的各类公告的同意。 \n 2.2【账户使用】 \n 2.2.1由于账户是您身份的认证，故只能采用您的学号来代替，但您有权对密码进行设置及更改。\n 2.2.2由于您的嗨市平台账户关联您的个人信息及嗨市平台商业信息，您的嗨市平台账户仅限您本人使用。未经嗨市平台同意，您直接或间接授权第三方使用您嗨市平台账户或获取您账户项下信息的行为无效。 \n  2.3【账户安全】 \n 2.3.1您的账户为您自行设置并由您保管，嗨市平台任何时候不会主动要求您提供您的账户密码。因此，建议您务必保管好您的账户。 \n 2.3.2账户因您主动泄露或因您遭受他人攻击、诈骗等行为导致的损失及后果，嗨市平台并不承担责任，您应通过司法、行政等救济途径向侵权行为人追偿。除嗨市平台存在过错外，您应对您账户项下的所有行为结果包括但不限于签署各类协议、发布信息、提出交易需求及披露信息等）负责。 \n 2.3.3如发现任何未经授权使用您账户登录嗨市平台或其他可能导致您账户遭窃、遗失的情况，建议您立即通知嗨市平台。您理解嗨市平台对您的任何请求采取行动均需要合理时间，且嗨市平台根据您请求而采取的行动可能无法避免或阻止侵害后果的形成或扩大。'
                },
                {
                    title: '3.信息管理',
                    content: '3.1 【信息真实】在使用嗨市平台服务时，您应当按嗨市平台的要求和提示准确完整地提供您的信息和交易相关信息（包括但不限于您的姓名、联系方式、交易信息等），以便嗨市平台与您联系并提供相应服务。您了解并同意，您有义务保证您提供的所有信息的真实性及有效性。\n  3.2 【信息授权】 \n 3.2.1为保证交易安全并向您提供更优质的服务，您了解并同意不可撤销地授权嗨市平台对于您的信息进行第三方信息认证，嗨市平台、查询服务提供机构及其指定的第三方可获取、查询、留存、整理及加工您的认证信息，但该认证信息仅用于通过嗨市平台进行的交易及相关的服务。 \n 3.2.2对于您提供、发布及在使用嗨市平台服务中形成的除个人信息外的文字、图片、视频、音频等非个人信息，在法律规定的保护期限内您免费授予嗨市平台、嗨市公司及其关联公司获得全球范围内排他的许可使用权利及再授权给其他第三方使用并可以自身名义对第三方侵权行为取证及提起诉讼的权利。您同意嗨市平台及其关联公司存储、使用、复制、修订、编辑、发布、展示、翻译、分发您的非个人信息或制作其派生作品，并以已知或日后开发的形式、媒体或技术将上述信息纳入其它作品内。 \n 3.2.3为方便您使用嗨市平台等其他相关服务，您授权嗨市平台将您在账户注册和使用嗨市平台服务过程中提供、形成的信息传递给嗨市平台等其他相关服务提供者，或从嗨市平台等其他相关服务提供者获取您在注册、使用相关服务期间提供、形成的信息。 \n 3.3 【违规信息处理】您提交的任何信息等资料中不得出现违法和不良信息，经嗨市平台确认，如存在上述情况，嗨市平台有权不经通知单方采取限期改正、暂停使用、注销登记、中止/终止提供服务、停滞账号、对于包含违规信息的内容屏蔽或断开链接等措施。嗨市平台对您提交的所有信息予以审核通过并不代表嗨市平台对其予以任何批准、许可、授权、同意、支持或承诺，您应当自行承担其法律责任。 \n  3.4 【信息纠正】在您浏览、使用嗨市平台时，如您发现嗨市平台上公示的信息与您提供的信息或其他与您利益相关的信息不一致时，您须及时联系嗨市公司予以纠正，嗨市平台对于信息展示的失误不免除您提供真实信息的义务和责任。 '
                },
                {
                    title: '4. 服务内容',
                    content: '4.1 嗨市平台根据公示的协议或规则、您参与的服务项目及您与嗨市公司（或关联方、合作方）订立的任何形式的协议或条款向您提供服务。\n  4.2 除非本服务协议另有其它明示规定，嗨市平台所推出的新产品、新功能、新服务，均受到本协议之规范。 \n 4.3鉴于网络服务的特殊性，您同意嗨市平台有权不经事先通知，随时变更、中断或终止部分或全部的网络服务。嗨市平台对网络服务的及时性、安全性、准确性、不中断性不作任何担保。'
                },
                {
                    title: '5. 用户信息获取及保护',
                    content: '5.1嗨市平台非常重视您的个人信息保护，在您使用嗨市平台提供的服务时，您同意嗨市平台按照公示的《法律声明和用户隐私权政策》收集、存储、使用、披露和保护您的个人信息。 \n  5.2非个人信息的保证与授权 \n 5.2.1【信息的发布】您声明并保证，您对您在网站所发布的信息拥有相应、合法的权利。否则，嗨市平台可对您发布的信息依法或依本协议进行删除或屏蔽。 \n 5.2.2【禁止性信息】您应当确保您所发布的信息不包含以下内容： \n 1）违反国家法律法规禁止性规定的； \n 2）政治宣传、封建迷信、淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；\n  3）欺诈、虚假、不准确或存在误导性的； \n 4）侵犯他人知识产权或涉及第三方商业秘密及其他专有权利的；\n  5）侮辱、诽谤、恐吓、涉及他人隐私等侵害他人合法权益的； \n 6）存在可能破坏、篡改、删除、影响嗨市平台任何系统正常运行或未经授权秘密获取嗨市平台及其他用户的数据、个人资料的病毒、木马、爬虫等恶意软件、程序代码的； \n 7）其他违背社会公共利益或公共道德或依据相关嗨市平台协议、规则的规定不适合在嗨市平台上发布的。 '
                },
                {
                    title: '6. 责任限制',
                    content: '6.1因以下情况造成网络服务在合理时间内的中断，嗨市平台无需为此承担任何责任： \n 1) 嗨市平台需要定期或不定期地对提供网络服务的平台或相关的设备进行检修或者维护，嗨市平台保留不经事先通知为维修保养、升级或其它目的暂停本服务任何部分的权利。  \n 2) 因台风、地震、洪水、雷电或恐怖袭击等不可抗力原因； \n  3) 用户的电脑软硬件和通信线路、供电线路出现故障的；  \n 4) 因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障、通讯故障、电力故障、银行原因、第三方服务瑕疵或政府行为等原因。\n  6.2您理解并接受对于嗨市公司向您提供的下列产品或服务的质量缺陷本身及其引发的任何损失（如有），嗨市公司无需承担任何责任: \n  1) 嗨市平台向您免费提供的各项产品或服务；  \n 2) 嗨市平台向您赠送的任何产品或服务。 \n 6.3.嗨市平台所载的信息，包括但不限于文本、图片、数据、观点、网页或链接，虽然竭力准确和详尽，但嗨市公司并不就其所包含的信息和内容的准确、完整、充分和可靠性做任何承诺，也不对这些信息和内容的错误或遗漏承担责任，也不对这些信息和内容作出任何明示或默示的包括但不限于没有侵犯第三方合法权益的保证。 '
                },
                {
                    title: '7. 通知',
                    content: '7.1您的有效联系方式包括：\n  1）您在注册成为嗨市平台用户，并接受嗨市平台服务时，您应该向嗨市平台提供真实有效的联系方式（包括您的电子邮件地址、联系电话、联系地址等），对于联系方式发生变更的，您有义务及时更新有关信息，并保持可被联系的状态。 \n 2）您在注册嗨市平台用户时生成的用于登陆嗨市平台接收系统通知或其他即时信息的用户账号（包括子账号），也作为您的有效联系方式。 \n 3）嗨市平台将向您的上述联系方式的其中之一或其中若干向您送达各类通知，而此类通知的内容可能对您的权利义务产生重大的有利或不利影响，请您务必及时关注。 \n 7.2 通知的送达 \n 1）嗨市平台通过上述联系方式向您发出通知，其中以电子的方式发出的书面通知，包括但不限于在嗨市平台公告，向您提供的联系电话发送手机短信，向您提供的电子邮件地址发送电子邮件，向您的账号发送系统消息，在发送成功后即视为送达；以纸质载体发出的书面通知，按照提供联系地址交邮后的第五个自然日即视为送达。 \n 2）对于在嗨市平台上因交易活动引起的任何纠纷，您同意司法机关、行政机关可以通过手机短信、电子邮件等现代通讯方式或邮寄方式向您送达法律相关文书。您指定接收法律文书的手机号码、电子邮箱或嗨市平台账号等联系方式为您在嗨市平台注册、更新时提供的手机号码、电子邮箱联系方式等，司法机关或行政机关向上述联系方式发出法律文书即视为送达。您指定的邮寄地址为您的法定联系地址或您提供的有效联系地址。 \n 3）您同意司法机关或行政机关可采取以上一种或多种送达方式向您达法律文书，司法机关或行政机关采取多种方式向您送达法律文书，送达时间以上述送达方式中最先送达的为准。 \n 4）您同意上述送达方式适用于各个行政司法程序阶段。 \n 5）你应当保证所提供的联系方式是准确、有效的，并进行实时更新。如果因提供的联系方式不确切，或不及时告知变更后的联系方式，使法律文书无法送达或未及时送达，由您自行承担由此可能产生的法律后果。 '
                },
                {
                    title: '8. 协议的终止',
                    content: '8.1【用户发起的终止】您有权通过以下任一方式终止本协议：\n  1）在满足嗨市平台公示的账户注销条件时您通过网站自助服务注销您的账户的； \n 2）变更事项生效前您停止使用并明示不愿接受变更事项的； \n 3）您明示不愿继续使用嗨市平台服务，且符合嗨市平台终止条件的。 \n 8.2【嗨市平台发起的终止】出现以下情况时，嗨市平台可以本协议第6条的所列的方式通知您终止本协议： \n 1）您违反本协议约定，嗨市平台依据违约条款终止本协议的；\n  2）您盗用他人账户、发布违禁信息、骗取他人财物、售假、扰乱市场秩序、采取不正当手段谋利等行为，嗨市平台依据嗨市平台规则对您的账户予以查封的； \n 3）您的账户被嗨市平台依据本协议回收的； \n 4）您在嗨市平台有欺诈、侵犯他人合法权益或其他严重违法违约行为的；  5）其它应当终止服务的情况。 \n 8.3 协议终止后的处理 \n 8.3.1【用户信息披露】本协议终止后，除法律有明确规定外，嗨市平台无义务向您或您指定的第三方披露您账户中的任何信息。 \n 8.3.2 【权利保留】本协议终止后，嗨市平台仍享有下列权利： \n 1）继续保存您留存于嗨市平台的本协议第5条所列的各类信息； \n 2）对于您过往的违约行为，嗨市平台仍可依据本协议向您追究违约责任。 '
                },
                {
                    title: '9. 法律适用、管辖与其他',
                    content: '9.1【法律适用】本协议之订立、生效、解释、修订、补充、终止、执行与争议解决均适用中华人民共和国大陆地区法律；如法律无相关规定的，参照商业惯例及/或行业惯例。 \n 9.2【管辖】您因使用嗨市平台服务所产生及与嗨市平台服务有关的争议，由嗨市平台与您协商解决。协商不成时，任何一方均可向嗨市公司所在地有管辖权的人民法院提起诉讼。 \n 9.3【可分性】本协议任一条款被视为废止、无效或不可执行，该条应视为可分的且并不影响本协议其余条款的有效性及可执行性。 '
                }
            ],
        ],
        headline: '',
        sectionInfo: '',
        section: null,
        id: null
    },
    onLoad: function (options) {
        let id = options.id;
        this.setData({
            headline: this.data.headlines[id],
            sectionInfo: this.data.sectionInfos[id],
            id: id
        });
        if (this.data.sections[id]) {
            this.setData({
                section: this.data.sections[id]
            })
        }
    },
    copyAdminWeixinNumber: function (event) {
        let id = event.currentTarget.dataset.id;
        let that = this;
        wx.setClipboardData({
            data: that.data.adminInfo[id].adminWeixinNumber,
            success: function (res) {
                wx.showToast({
                    title: that.data.modalCopySuccessMessage,
                })
            }
        });
    },
    onShareAppMessage: function () {
        return app.onShareAppMessage();
    }
});