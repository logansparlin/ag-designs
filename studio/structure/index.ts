import S from '@sanity/desk-tool/structure-builder';
import { BiHomeAlt, BiBookContent } from 'react-icons/bi'

const Structure = () => (
    S.list()
        .title('Content')
        .items([
            S.listItem()
                .title('Home')
                .child(
                    S.document()
                        .title('Home Page')
                        .id('homePage')
                        .documentId('homePage')
                        .schemaType('homePage')
                )
                .icon(BiHomeAlt),
            S.listItem()
                .title('FAQ')
                .child(
                    S.document()
                        .title('FAQ Page')
                        .id('faqPage')
                        .documentId('faqPage')
                        .schemaType('faqPage')
                )
                .icon(BiHomeAlt),
            S.divider(),
            S.listItem()
                .title('Projects')
                .schemaType('project')
                .icon(BiBookContent)
                .child(
                    S.documentTypeList('project')
                        .title('Project')
                        .child(documentId => (
                            S.document()
                                .documentId(documentId)
                                .schemaType('project')
                        ))
                )
        ])
)

export default Structure